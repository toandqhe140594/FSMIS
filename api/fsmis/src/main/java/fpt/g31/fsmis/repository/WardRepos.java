package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Ward;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WardRepos extends JpaRepository<Ward, Long> {
    List<Ward> findByDistrictIdOrderByNameAsc(Long districtId);
}
