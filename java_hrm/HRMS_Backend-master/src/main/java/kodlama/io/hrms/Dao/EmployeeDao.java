package kodlama.io.hrms.Dao;

import kodlama.io.hrms.entities.concretes.Employee;
import kodlama.io.hrms.entities.dtos.EmployeeDto;
import kodlama.io.hrms.entities.enums.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.NamedNativeQueries;
import javax.validation.constraints.Past;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeDao extends JpaRepository<Employee,Long> {
//    @Query("SELECT e, SUM(v.numberDay)" +
//            "FROM Employee e " +
//            "LEFT JOIN VacationEmployee v ON v.employee.id = e.id AND (MONTH(v.toDate) = MONTH(CURRENT_DATE) or MONTH(v.dayOff) = MONTH(CURRENT_DATE) )" +
//            "WHERE e.status = :status " +
//            "GROUP BY e.id")
    @Query("select new kodlama.io.hrms.entities.dtos.EmployeeDto(e.id,e.name,e.phone,e.dateOfBirth,e.address,e.email,e.salary,e.status,sum(vc.numberDay)) from Employee e left join VacationEmployee v on v.vacEmpKey.employee.id= e.id left join Vacation vc on vc.id = v.vacEmpKey.vacation.id where e.status=:status group by e.id")
    List<EmployeeDto> getAll(@Param("status")EmployeeStatus status);
    Optional<Employee> findByEmail(String email);
}
