package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.FishingLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FishingLocationRepos extends JpaRepository<FishingLocation, Long>, JpaSpecificationExecutor<FishingLocation> {

    @Query(nativeQuery = true, value = "SELECT * FROM\n" +
            " (\n" +
            "  SELECT\n" +
            "  *, (\n" +
            "     ACOS(SIN(PI()*?2/180.0)*SIN(PI()*latitude/180.0)+COS(PI()*?2/180.0)*COS(PI()*latitude/180.0)*COS(PI()*longitude/180.0-PI()*?1/180.0))*6371\n" +
            "  ) as distance\n" +
            "FROM tbl_fishing_location\n" +
            "where active = true\n" +
            " ) as t\n" +
            "where distance < ?3\n" +
            "ORDER BY distance;")
    List<FishingLocation> getNearByLocation(Float longitude, Float latitude, Integer distance, Long methodId, Integer minRating);

    List<FishingLocation> findByOwnerIdAndActiveIsTrue(Long ownerId);

    @Query(nativeQuery = true, value = "select *\n" +
            "from tbl_fishing_location tfl inner join tbl_employee_list tel on tfl.id = tel.fishing_location_id \n" +
            "where tel.employee_id = ?1")
    Optional<FishingLocation> findByEmployeeId(Long staffId);

    Optional<FishingLocation> findByPhone(String phone);
}
