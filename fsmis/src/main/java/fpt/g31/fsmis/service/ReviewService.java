package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.ReviewDtoIn;
import fpt.g31.fsmis.dto.output.PaginationDtoOut;
import fpt.g31.fsmis.dto.output.ReviewDtoOut;
import fpt.g31.fsmis.dto.output.ReviewScoreDtoOut;
import fpt.g31.fsmis.entity.*;
import fpt.g31.fsmis.repository.FishingLocationRepos;
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

    private final JwtFilter jwtFilter;
    private final FishingLocationRepos fishingLocationRepos;
    private final ReviewRepos reviewRepos;
    private final VoteRepos voteRepos;
    private final ModelMapper modelMapper;

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

    // PERSONAL REVIEW

    public Object getMyReview(HttpServletRequest request, Long locationId) {
        User user = jwtFilter.getUserFromToken(request);
        Review review = reviewRepos.findByFishingLocationIdAndUserIdAndActiveIsTrue(locationId, user.getId());
        if(review == null) {
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

    public String postReview(HttpServletRequest request, Long locationId, ReviewDtoIn reviewDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        if (reviewRepos.findByFishingLocationIdAndUserIdAndActiveIsTrue(locationId, user.getId()) != null) {
            throw new ValidationException("Đánh giá đã tồn tại");
        }
        FishingLocation fishingLocation = fishingLocationRepos.getById(locationId);
        Review review = modelMapper.map(reviewDtoIn, Review.class);
        review.setTime(LocalDateTime.now());
        review.setActive(true);
        review.setUser(user);
        review.setFishingLocation(fishingLocation);
        reviewRepos.save(review);
        return "Đánh giá thành công";
    }

    public String editReview(HttpServletRequest request, Long locationId, ReviewDtoIn reviewDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        Review review = reviewRepos.findByFishingLocationIdAndUserIdAndActiveIsTrue(locationId, user.getId());
        review.setTime(LocalDateTime.now());
        review.setScore(reviewDtoIn.getScore());
        review.setDescription(reviewDtoIn.getDescription());
        reviewRepos.save(review);
        return "Đánh giá thành công";
    }

    public String deleteReview(HttpServletRequest request, Long locationId) {
        User user = jwtFilter.getUserFromToken(request);
        Review review = reviewRepos.findByFishingLocationIdAndUserIdAndActiveIsTrue(locationId, user.getId());
        review.setActive(false);
        reviewRepos.save(review);
        return "Xóa đánh giá thành công";
    }

    // ALL REVIEWS

    public PaginationDtoOut getAllReviews(HttpServletRequest request, Long locationId, String filter, int pageNo) {
        if (pageNo <= 0) {
            throw new IllegalArgumentException("Địa chỉ không tồn tại");
        }
        if (!filter.equals("newest") && !filter.equals("highest") && !filter.equals("lowest")) {
            throw new IllegalArgumentException("Địa chỉ không tồn tại");
        }
        User user = jwtFilter.getUserFromToken(request);
        Pageable pageable = PageRequest.of(pageNo - 1, 10);
        Page<Review> reviews = null;
        if (filter.equals("newest")) {
            reviews = reviewRepos.findByFishingLocationIdAndActiveIsTrueOrderByTimeDesc(locationId, pageable);
        } else if (filter.equals("highest")) {
            reviews = reviewRepos.findByFishingLocationIdAndActiveIsTrueOrderByScoreDesc(locationId, pageable);
        } else {
            reviews = reviewRepos.findByFishingLocationIdAndActiveIsTrueOrderByScoreAsc(locationId, pageable);
        }
        List<ReviewDtoOut> output = new ArrayList<>();
        for (Review review : reviews) {
            if(review.getUser() == user) {
                continue;
            }
            ReviewDtoOut item = modelMapper.map(review, ReviewDtoOut.class);
            item.setUserId(review.getUser().getId());
            item.setUserFullName(review.getUser().getFullName());
            item.setUserAvatar(review.getUser().getAvatarUrl());
            item.setTime(ServiceUtils.convertDateToString(review.getTime()));
            item.setUpvote(voteRepos.getVoteCountByReviewId(review.getId(), 0));
            item.setDownvote(voteRepos.getVoteCountByReviewId(review.getId(), 1));
            Vote vote = voteRepos.findByReviewIdAndUserId(review.getId(), user.getId());
            if(vote != null) {
                if (vote.getVoteType() == VoteType.UPVOTE) {
                    item.setUserVoteType(true);
                } else if (vote.getVoteType() == VoteType.DOWNVOTE) {
                    item.setUserVoteType(false);
                }
            }
            output.add(item);
        }
        return PaginationDtoOut.builder()
                .totalPage(reviews.getTotalPages())
                .pageNo(pageNo)
                .items(output)
                .build();
    }
}
