package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.PostDtoIn;
import fpt.g31.fsmis.dto.output.PaginationDtoOut;
import fpt.g31.fsmis.dto.output.PostDtoOut;
import fpt.g31.fsmis.dto.output.ResponseTextDtoOut;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.Post;
import fpt.g31.fsmis.entity.Role;
import fpt.g31.fsmis.entity.User;
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

@Service
@AllArgsConstructor
public class PostService {
    private PostRepos postRepos;
    private JwtFilter jwtFilter;
    private ModelMapper modelMapper;
    private FishingLocationRepos locationRepos;

    public PaginationDtoOut getPostByLocationId(Long locationId, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException("Không tìm thấy hồ câu!");
        }
        Page<Post> postList = postRepos.findByFishingLocationIdAndActiveIsTrueOrderByPostTimeDesc(locationId, PageRequest.of(pageNo - 1, 10));
        List<PostDtoOut> output = new ArrayList<>();
        for (Post post : postList) {
            PostDtoOut item = modelMapper.map(post, PostDtoOut.class);
            item.setPostTime(ServiceUtils.convertDateToString(post.getPostTime()));
            output.add(item);
        }
        return PaginationDtoOut.builder()
                .totalPage(postList.getTotalPages())
                .pageNo(pageNo)
                .items(output)
                .build();
    }

    public ResponseTextDtoOut createPost(Long locationId, PostDtoIn postDtoIn, HttpServletRequest request) {
        User user = jwtFilter.getUserFromToken(request);
        FishingLocation location = locationRepos.findById(locationId)
                .orElseThrow(() -> new ValidationException("Không tìm thấy hồ câu!"));
        if (!location.getOwner().equals(user)
                && !location.getEmployeeList().contains(user)) {
            throw new ValidationException("Không có quyền tạo bài viết");
        }
        Post post = Post.builder()
                .content(postDtoIn.getContent())
                .postTime(LocalDateTime.now())
                .postType(postDtoIn.getPostType())
                .edited(false)
                .active(true)
                .attachmentType(postDtoIn.getAttachmentType())
                .url(postDtoIn.getUrl())
                .fishingLocation(location)
                .build();
        postRepos.save(post);
        return new ResponseTextDtoOut("Tạo bài viết thành công!");
    }

    public ResponseTextDtoOut deletePost(Long postId, HttpServletRequest request) {
        User user = jwtFilter.getUserFromToken(request);
        Post post = postRepos.findById(postId)
                .orElseThrow(() -> new ValidationException("Không tìm thấy bài viết!"));
        FishingLocation location = post.getFishingLocation();
        if (!location.getOwner().equals(user)
                && !location.getEmployeeList().contains(user)
                && !user.getRoles().contains(Role.ROLE_ADMIN)) {
            throw new ValidationException("Không có quyền xóa bài viết!");
        }
        post.setActive(false);
        postRepos.save(post);
        return new ResponseTextDtoOut("Xóa bài viết thành công!");
    }
}
