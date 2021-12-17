package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProvinceRepos extends JpaRepository<Province, Long> {
    List<Province> findAllByOrderByNameAsc();
}
