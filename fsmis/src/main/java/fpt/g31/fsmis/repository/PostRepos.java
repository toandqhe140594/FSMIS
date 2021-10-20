package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepos extends JpaRepository<Post, Long> {
    List<Post> findByFishingLocationId(Long id, Pageable pageable);
}
