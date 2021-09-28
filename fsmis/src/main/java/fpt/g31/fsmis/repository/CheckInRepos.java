package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.CheckIn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckInRepos extends JpaRepository<CheckIn, Long> {

}
