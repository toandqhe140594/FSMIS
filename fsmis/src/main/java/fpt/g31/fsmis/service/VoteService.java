package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.output.ReviewDtoOut;
import fpt.g31.fsmis.entity.Review;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.entity.Vote;
import fpt.g31.fsmis.entity.VoteType;
import fpt.g31.fsmis.repository.ReviewRepos;
import fpt.g31.fsmis.repository.VoteRepos;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;

@Service
@AllArgsConstructor
public class VoteService {

    private final VoteRepos voteRepos;
    private final ReviewRepos reviewRepos;
    private final JwtFilter jwtFilter;
    private final ModelMapper modelMapper;

    public ReviewDtoOut vote(HttpServletRequest request, Long reviewId, Long voteType) {
        if (voteType != 1 && voteType != 0) {
            throw new ValidationException("Địa chỉ không tồn tại");
        }
        User user = jwtFilter.getUserFromToken(request);
        Vote vote = voteRepos.findByReviewIdAndUserId(reviewId, user.getId());
        if (vote == null) {
            vote = Vote.builder()
                    .user(user)
                    .review(reviewRepos.getById(reviewId))
                    .build();
            if (voteType == 1) {
                vote.setVoteType(VoteType.UPVOTE);
                voteRepos.save(vote);
            } else if (voteType == 0) {
                vote.setVoteType(VoteType.DOWNVOTE);
                voteRepos.save(vote);
            }
        } else {
            if ((voteType == 1 && vote.getVoteType() == VoteType.UPVOTE)
                    || (voteType == 0 && vote.getVoteType() == VoteType.DOWNVOTE)) {
                voteRepos.delete(vote);
            } else if (voteType == 1 && vote.getVoteType() == VoteType.DOWNVOTE) {
                vote.setVoteType(VoteType.UPVOTE);
                voteRepos.save(vote);
            } else {
                vote.setVoteType(VoteType.DOWNVOTE);
                voteRepos.save(vote);
            }
        }
        Review review = reviewRepos.getById(reviewId);
        ReviewDtoOut output = modelMapper.map(review, ReviewDtoOut.class);
        output.setUserId(review.getUser().getId());
        output.setUserFullName(review.getUser().getFullName());
        output.setUserAvatar(review.getUser().getAvatarUrl());
        output.setTime(ServiceUtils.convertDateToString(review.getTime()));
        output.setUpvote(voteRepos.getVoteCountByReviewId(review.getId(), 0));
        output.setDownvote(voteRepos.getVoteCountByReviewId(review.getId(), 1));
        Vote voteOutput = voteRepos.findByReviewIdAndUserId(review.getId(), user.getId());
        if(voteOutput != null) {
            if (voteOutput.getVoteType() == VoteType.UPVOTE) {
                output.setUserVoteType(true);
            } else if (voteOutput.getVoteType() == VoteType.DOWNVOTE) {
                output.setUserVoteType(false);
            }
        }
        return output;
    }
}
