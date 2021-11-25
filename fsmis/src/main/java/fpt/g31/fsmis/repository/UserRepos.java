package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepos extends JpaRepository<User, Long> {

    Optional<User> findByPhone(String phone);

    Boolean existsByPhone(String phone);

    Optional<User> findByQrString(String qrString);

    @Query(value = "select distinct owner_id \n" +
            "from tbl_fishing_location tfl", nativeQuery = true)
    List<Long> getAllOwnerId();

    @Query(value = "select distinct employee_id \n" +
            "from tbl_employee_list tel ", nativeQuery = true)
    List<Long> getAllStaffId();

    Page<User> findAllByIdNot(Pageable pageable, Long id);

    Page<User> findAllByPhoneLikeAndIdNot(String phone, Pageable pageable, Long id);

    Page<User> findAllByFullNameLikeAndIdNot(String name, Pageable pageable, long id);
}
