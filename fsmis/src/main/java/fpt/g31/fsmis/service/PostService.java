package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.output.PostDtoOut;
import fpt.g31.fsmis.entity.Post;
import fpt.g31.fsmis.repository.PostRepos;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PostService {
    PostRepos postRepos;
    ModelMapper modelMapper;
    public List<PostDtoOut> getPostByLocationId(Long locationId, Integer page){
        List<Post> postList = postRepos.findByFishingLocationId(locationId, PageRequest.of(page, 2));
        List<PostDtoOut> postDtoOutList = new ArrayList<>();
        for (Post post :
                postList) {
            PostDtoOut postDtoOut = modelMapper.map(post, PostDtoOut.class);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            postDtoOut.setPostTime(post.getPostTime().format(formatter));
            postDtoOutList.add(postDtoOut);
        }
        return postDtoOutList;
    }
}
