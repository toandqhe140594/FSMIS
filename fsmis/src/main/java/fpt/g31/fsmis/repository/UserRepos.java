package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepos extends JpaRepository<User, Long> {

    Optional<User> findByPhone(String phone);

    boolean existsByPhone(String phone);

    Optional<User> findByQrString(String qrString);

    @Query(value = "select distinct owner_id \n" +
            "from tbl_fishing_location tfl", nativeQuery = true)
    List<Long> getAllOwnerId();

    @Query(value = "select distinct employee_id \n" +
            "from tbl_employee_list tel ", nativeQuery = true)
    List<Long> getAllStaffId();

}
