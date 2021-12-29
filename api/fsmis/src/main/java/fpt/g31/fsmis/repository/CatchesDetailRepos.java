package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.CatchesDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatchesDetailRepos extends JpaRepository<CatchesDetail, Long> {
}
