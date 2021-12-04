package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.ReviewDtoIn;
import fpt.g31.fsmis.dto.output.PaginationDtoOut;
import fpt.g31.fsmis.dto.output.ResponseTextDtoOut;
import fpt.g31.fsmis.dto.output.ReviewDtoOut;
import fpt.g31.fsmis.dto.output.ReviewScoreDtoOut;
import fpt.g31.fsmis.entity.*;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.FishingLocationRepos;
import fpt.g31.fsmis.repository.NotificationRepos;
import fpt.g31.fsmis.repository.ReviewRepos;
import fpt.g31.fsmis.repository.VoteRepos;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ReviewService {

    private static final String REVIEW_NOT_FOUND = "Không tìm thấy đánh giá";
    private final JwtFilter jwtFilter;
    private final FishingLocationRepos fishingLocationRepos;
    private final ReviewRepos reviewRepos;
    private final VoteRepos voteRepos;
    private final ModelMapper modelMapper;
    private final NotificationRepos notificationRepos;

    static ReviewDtoOut addReviewDtoOut(User user, Review review, ModelMapper modelMapper, VoteRepos voteRepos) {
        ReviewDtoOut item = modelMapper.map(review, ReviewDtoOut.class);
        item.setUserId(review.getUser().getId());
        item.setUserFullName(review.getUser().getFullName());
        item.setUserAvatar(review.getUser().getAvatarUrl());
        item.setTime(ServiceUtils.convertDateToString(review.getTime()));
        item.setUpvote(voteRepos.getVoteCountByReviewId(review.getId(), 1));
        item.setDownvote(voteRepos.getVoteCountByReviewId(review.getId(), 0));
        Vote vote = voteRepos.findByReviewIdAndUserId(review.getId(), user.getId());
        if (vote != null) {
            if (vote.getVoteType() == VoteType.UPVOTE) {
                item.setUserVoteType(true);
            } else if (vote.getVoteType() == VoteType.DOWNVOTE) {
                item.setUserVoteType(false);
            }
        }
        return item;
    }

    // PERSONAL REVIEW

    public ReviewScoreDtoOut getReviewScore(Long locationId) {
        Double score = reviewRepos.getAverageScoreByFishingLocationIdAndActiveIsTrue(locationId);
        if (score == null) {
            score = 0.0;
        }
        return ReviewScoreDtoOut.builder()
                .score(score)
                .totalReviews(reviewRepos.countByFishingLocationIdAndActiveIsTrue(locationId))
                .build();
    }

    public Object getMyReview(HttpServletRequest request, Long locationId) {
        User user = jwtFilter.getUserFromToken(request);
        Review review = reviewRepos.findByFishingLocationIdAndUserIdAndActiveIsTrue(locationId, user.getId());
        if (review == null) {
            return "Bạn chưa đánh giá";
        } else {
            return ReviewDtoOut.builder()
                    .id(review.getId())
                    .userId(user.getId())
                    .userFullName(user.getFullName())
                    .userAvatar(user.getAvatarUrl())
                    .userVoteType(null)
                    .score(review.getScore())
                    .description(review.getDescription())
                    .time(ServiceUtils.convertDateToString(review.getTime()))
                    .upvote(voteRepos.getVoteCountByReviewId(review.getId(), 0))
                    .downvote(voteRepos.getVoteCountByReviewId(review.getId(), 1))
                    .build();
        }
    }

    public ReviewDtoOut postReview(HttpServletRequest request, Long locationId, ReviewDtoIn reviewDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        if (reviewRepos.existsByFishingLocationIdAndUserIdAndActiveIsTrue(locationId, user.getId())) {
            throw new ValidationException("Bạn đã đánh giá ở địa điểm này rồi");
        }
        FishingLocation fishingLocation = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy điểm câu"));
        if (fishingLocation.getOwner().equals(user) || fishingLocation.getEmployeeList().contains(user)) {
            throw new ValidationException("Bạn không có quyền đăng đánh giá ở địa điểm này");
        }
        Review review = modelMapper.map(reviewDtoIn, Review.class);
        review.setTime(LocalDateTime.now());
        review.setActive(true);
        review.setUser(user);
        review.setFishingLocation(fishingLocation);
        reviewRepos.save(review);
        fishingLocation.setScore(reviewRepos.getAverageScoreByFishingLocationIdAndActiveIsTrue(fishingLocation.getId()).floatValue());
        fishingLocationRepos.save(fishingLocation);
        return ReviewDtoOut.builder()
                .id(0L)
                .userId(user.getId())
                .userFullName(user.getFullName())
                .userAvatar(user.getAvatarUrl())
                .userVoteType(null)
                .score(review.getScore())
                .description(review.getDescription())
                .time(ServiceUtils.convertDateToString(review.getTime()))
                .upvote(0L)
                .downvote(0L)
                .build();
    }

    public String deleteReview(HttpServletRequest request, Long locationId) {
        User user = jwtFilter.getUserFromToken(request);
        Review review = reviewRepos.findByFishingLocationIdAndUserIdAndActiveIsTrue(locationId, user.getId());
        if (review == null) {
            throw new ValidationException("Đánh giá không tồn tại");
        }
        review.setActive(false);
        reviewRepos.save(review);
        FishingLocation location = review.getFishingLocation();
        Double avgScore = reviewRepos.getAverageScoreByFishingLocationIdAndActiveIsTrue(locationId);
        location.setScore(avgScore == null ? 0 : avgScore.floatValue());
        fishingLocationRepos.save(location);
        return "Xóa đánh giá thành công";
    }

    public PaginationDtoOut getAllReviews(HttpServletRequest request, Long locationId, String filter, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException("Số trang không hợp lệ");
        }
        if (!filter.equals("newest") && !filter.equals("highest") && !filter.equals("lowest")) {
            throw new ValidationException("Bộ lọc không hợp lệ");
        }
        User user = jwtFilter.getUserFromToken(request);
        Pageable pageable = PageRequest.of(pageNo - 1, 10);
        Page<Review> reviews;
        if (filter.equals("newest")) {
            reviews = reviewRepos.findByFishingLocationIdAndActiveIsTrueOrderByTimeDesc(locationId, pageable);
        } else if (filter.equals("highest")) {
            reviews = reviewRepos.findByFishingLocationIdAndActiveIsTrueOrderByScoreDescTimeDesc(locationId, pageable);
        } else {
            reviews = reviewRepos.findByFishingLocationIdAndActiveIsTrueOrderByScoreAscTimeDesc(locationId, pageable);
        }
        List<ReviewDtoOut> output = new ArrayList<>();
        for (Review review : reviews) {
            if (review.getUser() == user) {
                continue;
            }
            ReviewDtoOut item = addReviewDtoOut(user, review, modelMapper, voteRepos);
            output.add(item);
        }
        return PaginationDtoOut.builder()
                .totalPage(reviews.getTotalPages())
                .pageNo(pageNo)
                .totalItem(reviews.getTotalElements())
                .items(output)
                .build();
    }

    public ResponseTextDtoOut adminDeleteReview(Long reviewId) {
        Review review = reviewRepos.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(REVIEW_NOT_FOUND));
        review.setActive(false);
        reviewRepos.save(review);
        FishingLocation location = review.getFishingLocation();
        Double avgScore = reviewRepos.getAverageScoreByFishingLocationIdAndActiveIsTrue(location.getId());
        location.setScore(avgScore == null ? 0 : avgScore.floatValue());
        fishingLocationRepos.save(location);
        String notificationText = "Đánh giá của bạn ở " + review.getFishingLocation().getName() + " đã bị xóa do vi phạm điều khoản ứng dụng";
        List<User> notificationReceiver = new ArrayList<>();
        notificationReceiver.add(review.getUser());
        NotificationService.createNotification(notificationRepos, notificationText, notificationReceiver);
        return new ResponseTextDtoOut("Xóa bài đánh giá thành công");
    }
}
