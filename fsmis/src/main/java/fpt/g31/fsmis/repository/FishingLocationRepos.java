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
            "AND score >= ?4\n" +
            " ) as t\n" +
            "where distance < ?3\n" +
            "ORDER BY distance;")
    List<FishingLocation> getNearbyLocation(Float longitude, Float latitude, Integer distance, Integer minRating);

    @Query(nativeQuery = true, value = "select *\n" +
            "from tbl_fishing_location tfl inner join tbl_employee_list tel on tfl.id = tel.fishing_location_id \n" +
            "where tel.employee_id = ?1")
    Optional<FishingLocation> findByEmployeeIdAndActiveIsTrue(Long staffId);

    @Query(nativeQuery = true, value = "SELECT * FROM\n" +
            " (\n" +
            "  select distinct\n" +
            "  tfl.id, tfl.active, tfl.address, tfl.created_date, tfl.description, tfl.image_url, tfl.last_edited_date, tfl.latitude, tfl.longitude,\n" +
            "  tfl.name, tfl.phone, tfl.rule, tfl.service, tfl.timetable, tfl.verify, tfl.website, tfl.owner_id, tfl.ward_id, tfl.closed, tfl.unsigned_name, tfl.score, tfl.pending, (\n" +
            "    ACOS(SIN(PI()*?2/180.0)*SIN(PI()*latitude/180.0)+COS(PI()*?2/180.0)*COS(PI()*latitude/180.0)*COS(PI()*longitude/180.0-PI()*?1/180.0))*6371\n" +
            "  ) as distance\n" +
            "  FROM tbl_fishing_location tfl\n" +
            "  inner join tbl_lake tl on tfl.id = tl.fishing_location_id\n" +
            "  inner join tbl_lake_fishing_method tlfm on tl.id = tlfm.lake_id\n" +
            "  where tfl.active = true\n" +
            "  and tl.active = true\n" +
            "  AND tfl.score >= ?4\n" +
            "  and tlfm.fishing_method_id = ?5\n" +
            " ) as t\n" +
            "where distance < ?3\n" +
            "ORDER BY distance;")
    List<FishingLocation> getNearbyLocationWithMethodId(Float longitude, Float latitude, Integer distance, Integer minRating, Long methodId);

    @Query(value = "SELECT fl FROM FishingLocation fl where fl.owner.id = ?1 and (fl.active = true or fl.pending = true)")
    List<FishingLocation> findOwnedLocation(Long id);

    List<FishingLocation> findByPhoneAndPendingIsTrue(String phone);
}
