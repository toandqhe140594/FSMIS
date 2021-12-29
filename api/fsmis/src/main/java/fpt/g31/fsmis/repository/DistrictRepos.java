package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DistrictRepos extends JpaRepository<District, Long> {
    List<District> findByProvinceIdOrderByNameAsc(Long provinceId);
}
