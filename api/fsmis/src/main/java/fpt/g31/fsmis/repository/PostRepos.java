package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepos extends JpaRepository<Post, Long> {
    Page<Post> findByFishingLocationIdAndActiveIsTrueOrderByPostTimeDesc(Long id, Pageable pageable);

    Optional<Post> findByFishingLocationIdAndPinnedIsTrue(Long id);
}
