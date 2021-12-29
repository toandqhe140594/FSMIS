package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.BannedPhone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BannedPhoneRepos extends JpaRepository<BannedPhone, String> {
    List<BannedPhone> findAllByOrderByBannedDateDesc();
}