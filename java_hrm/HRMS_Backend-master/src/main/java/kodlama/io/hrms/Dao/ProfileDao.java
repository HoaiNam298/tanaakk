package kodlama.io.hrms.Dao;

import kodlama.io.hrms.entities.concretes.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileDao extends JpaRepository<Profile,Long> {
    @Query("select p from Profile p join User u on  u.id=p.user.id where u.email=:id")
    Optional<Profile> findByUserId(@Param("id") String aLong);
}
