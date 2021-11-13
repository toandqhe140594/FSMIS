package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.ReportUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportUserRepos extends JpaRepository<ReportUser, Long> {
    List<ReportUser> findAllByReportId(Long reportId);
}
