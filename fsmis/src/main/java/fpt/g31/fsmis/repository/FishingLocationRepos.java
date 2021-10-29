package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.FishingLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FishingLocationRepos extends JpaRepository<FishingLocation, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM\n" +
            " (\n" +
            "  SELECT\n" +
            "  *, (\n" +
            "     ACOS(SIN(PI()*?2/180.0)*SIN(PI()*latitude/180.0)+COS(PI()*?2/180.0)*COS(PI()*latitude/180.0)*COS(PI()*longitude/180.0-PI()*?1/180.0))*6371\n" +
            "  ) as distance\n" +
            "  FROM tbl_fishing_location \n" +
            " ) as t\n" +
            "where distance < ?3\n" +
            "ORDER BY distance;")
    List<FishingLocation> getNearByLocation(Float longitude, Float latitude, Integer distance, Long methodId, Integer minRating);

    List<FishingLocation> findByOwnerIdAndActiveIsTrue(Long ownerId);
}
