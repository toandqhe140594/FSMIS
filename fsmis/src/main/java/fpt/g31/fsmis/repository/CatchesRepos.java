package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Catches;
import fpt.g31.fsmis.entity.CatchesDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatchesRepos extends JpaRepository<Catches, Long> {

    List<Catches> findByUserId(Long id);

}
