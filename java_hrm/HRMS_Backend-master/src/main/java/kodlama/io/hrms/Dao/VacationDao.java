package kodlama.io.hrms.Dao;

import kodlama.io.hrms.entities.concretes.Vacation;
import kodlama.io.hrms.entities.concretes.VacationEmployee;
import kodlama.io.hrms.entities.enums.VacationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VacationDao extends JpaRepository<Vacation,Long> {

    @Query("select vc from Vacation vc join VacationEmployee v on v.vacEmpKey.vacation.id=vc.id join Employee e on e.id = v.vacEmpKey.employee.id where e.id=:id and v.vacEmpKey.vacation.status ='ACTIVE'")
    List<Vacation> findByEmpId(@Param("id") Long aLong);
    @Query("select v from Vacation v where v.vacationType=:status")
    Optional<Vacation> findByVacationType(@Param("status") VacationType vacationType);

}
