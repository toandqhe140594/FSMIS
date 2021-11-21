package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.PostDtoIn;
import fpt.g31.fsmis.dto.output.PaginationDtoOut;
import fpt.g31.fsmis.dto.output.PostDtoOut;
import fpt.g31.fsmis.dto.output.ResponseTextDtoOut;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.Post;
import fpt.g31.fsmis.entity.Role;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.exception.UnauthorizedException;
import fpt.g31.fsmis.repository.FishingLocationRepos;
import fpt.g31.fsmis.repository.PostRepos;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {
    private PostRepos postRepos;
    private JwtFilter jwtFilter;
    private ModelMapper modelMapper;
    private FishingLocationRepos locationRepos;
    private static final String POST_NOT_FOUND = "Không tìm thấy bài viết!";

    public PaginationDtoOut getPostByLocationId(Long locationId, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException("Số trang không hợp lệ");
        }
        List<PostDtoOut> output = new ArrayList<>();
        Page<Post> postList = postRepos.findByFishingLocationIdAndActiveIsTrueOrderByPostTimeDesc(locationId, PageRequest.of(pageNo - 1, 10));
        for (Post post : postList) {
            PostDtoOut item = modelMapper.map(post, PostDtoOut.class);
            item.setPostTime(ServiceUtils.convertDateToString(post.getPostTime()));
            output.add(item);
        }
        return PaginationDtoOut.builder()
                .totalPage(postList.getTotalPages())
                .pageNo(pageNo)
                .totalItem(postList.getTotalElements())
                .items(output)
                .build();
    }

    public ResponseTextDtoOut savePost(Long locationId, PostDtoIn postDtoIn, HttpServletRequest request, Boolean isCreate) {
        User user = jwtFilter.getUserFromToken(request);
        FishingLocation location = locationRepos.findById(locationId)
                .orElseThrow(() -> new ValidationException("Không tìm thấy hồ câu!"));
        if (!location.getOwner().equals(user)
                && !location.getEmployeeList().contains(user)) {
            throw new ValidationException("Không có quyền tạo/chỉnh sửa bài viết!");
        }
        if (Boolean.TRUE.equals(isCreate)) {
            Post post = Post.builder()
                    .content(postDtoIn.getContent())
                    .postTime(LocalDateTime.now())
                    .postType(postDtoIn.getPostType())
                    .edited(false)
                    .active(true)
                    .attachmentType(postDtoIn.getAttachmentType())
                    .url(postDtoIn.getUrl())
                    .posterId(user.getId())
                    .fishingLocation(location)
                    .build();
            postRepos.save(post);
            return new ResponseTextDtoOut("Tạo bài viết thành công!");
        } else {
            Post post = postRepos.findById(postDtoIn.getId())
                    .orElseThrow(() -> new ValidationException("Không tìm thấy bài viết"));
            post.setContent(postDtoIn.getContent());
            post.setPostType(postDtoIn.getPostType());
            post.setAttachmentType(postDtoIn.getAttachmentType());
            post.setUrl(postDtoIn.getUrl());
            post.setEdited(true);
            postRepos.save(post);
            return new ResponseTextDtoOut("Chỉnh sửa bài viết thành công!");
        }
    }

    public ResponseTextDtoOut deletePost(Long postId, HttpServletRequest request) {
        User user = jwtFilter.getUserFromToken(request);
        Post post = postRepos.findById(postId)
                .orElseThrow(() -> new NotFoundException(POST_NOT_FOUND));
        FishingLocation location = post.getFishingLocation();
        if (!location.getOwner().equals(user)
                && !location.getEmployeeList().contains(user)
                && !user.getRoles().contains(Role.ROLE_ADMIN)) {
            throw new UnauthorizedException("Không có quyền xóa bài viết!");
        }
        post.setActive(false);
        post.setPinned(false);
        postRepos.save(post);
        return new ResponseTextDtoOut("Xóa bài viết thành công!");
    }

    public ResponseTextDtoOut pinPost(HttpServletRequest request, Long postId) {
        User user = jwtFilter.getUserFromToken(request);
        Post post = postRepos.findById(postId)
                .orElseThrow(() -> new ValidationException(POST_NOT_FOUND));
        FishingLocation location = post.getFishingLocation();
        if (!location.getOwner().equals(user)
                && !location.getEmployeeList().contains(user)) {
            throw new UnauthorizedException("Không có quyền ghim bài viết!");
        }
        if (Boolean.TRUE.equals(post.getPinned())) {
            post.setPinned(false);
            postRepos.save(post);
            return new ResponseTextDtoOut("Bỏ ghim bài viết thành công");
        }
        Optional<Post> pinnedPostOptional = postRepos.findByFishingLocationIdAndPinnedIsTrue(post.getFishingLocation().getId());
        if (pinnedPostOptional.isPresent()) {
            Post pinnedPost = pinnedPostOptional.get();
            pinnedPost.setPinned(false);
            postRepos.save(pinnedPost);
        }
        post.setPinned(true);
        postRepos.save(post);
        return new ResponseTextDtoOut("Ghim bài viết thành công");
    }

    public PostDtoOut getPinnedPost(Long locationId) {
        PostDtoOut output = null;
        Optional<Post> pinnedPostOptional = postRepos.findByFishingLocationIdAndPinnedIsTrue(locationId);
        if (pinnedPostOptional.isPresent()) {
            Post pinnedPost = pinnedPostOptional.get();
            output = PostDtoOut.builder()
                    .id(pinnedPost.getId())
                    .content(pinnedPost.getContent())
                    .postTime(ServiceUtils.convertDateToString(pinnedPost.getPostTime()))
                    .postType(pinnedPost.getPostType().toString())
                    .url(pinnedPost.getUrl())
                    .attachmentType(pinnedPost.getAttachmentType().toString())
                    .pinned(true)
                    .edited(pinnedPost.getEdited()).build();
        }
        return output;
    }

    public ResponseTextDtoOut adminDeletePost(Long postId) {
        Post post = postRepos.findById(postId)
                .orElseThrow(() -> new NotFoundException(POST_NOT_FOUND));
        post.setActive(false);
        post.setPinned(false);
        postRepos.save(post);
        return new ResponseTextDtoOut("Xóa bài viết thành công!");
    }
}
