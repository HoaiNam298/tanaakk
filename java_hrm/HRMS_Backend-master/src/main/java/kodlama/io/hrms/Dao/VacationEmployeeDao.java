package kodlama.io.hrms.Dao;

import kodlama.io.hrms.entities.concretes.VacationEmployee;
import kodlama.io.hrms.entities.key.VacEmpKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface VacationEmployeeDao extends JpaRepository<VacationEmployee, VacEmpKey> {
}
