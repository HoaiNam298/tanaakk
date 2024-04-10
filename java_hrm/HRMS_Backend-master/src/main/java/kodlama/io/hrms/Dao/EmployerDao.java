package kodlama.io.hrms.Dao;

import kodlama.io.hrms.entities.concretes.Employer;

import kodlama.io.hrms.entities.dtos.EmployerDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployerDao extends JpaRepository<Employer,Integer> {
	
	@Override
    @Query("select e from Employer e order by e.id asc")
    List<Employer> findAll();

    Employer getEmployerById(int id);
    @Query("SELECT MAX(o.id) FROM Employer o")
    Integer maxEmployerId();
    @Query("select e from Employer e where lower(e.companyName) like lower(:s)")
    List<Employer> searchByName(@Param("s") String s);
}
