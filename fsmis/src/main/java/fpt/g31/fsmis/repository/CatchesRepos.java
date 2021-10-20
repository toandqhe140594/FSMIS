package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Catches;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CatchesRepos extends JpaRepository<Catches, Long> {

    List<Catches> findByUserId(Long id);

}
