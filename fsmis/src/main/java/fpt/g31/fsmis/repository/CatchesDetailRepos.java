package fpt.g31.fsmis.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import fpt.g31.fsmis.entity.CatchesDetail;
import org.springframework.stereotype.Repository;

@Repository
public interface CatchesDetailRepos extends JpaRepository<CatchesDetail, Long>{
}
