package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.output.PaginationDtoOut;
import fpt.g31.fsmis.dto.output.PostDtoOut;
import fpt.g31.fsmis.entity.Post;
import fpt.g31.fsmis.repository.PostRepos;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PostService {
    PostRepos postRepos;
    ModelMapper modelMapper;


    public PaginationDtoOut getPostByLocationId(Long locationId, Integer pageNo) {
        Page<Post> postList = postRepos.findByFishingLocationIdOrderByPostTimeDesc(locationId, PageRequest.of(pageNo - 1, 10));
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
}
