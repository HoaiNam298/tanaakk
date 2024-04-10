package kodlama.io.hrms.Dao;


import kodlama.io.hrms.entities.concretes.JobPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPositionDao extends JpaRepository<JobPosition,Integer> {
    @Override
    @Query("select jp from JobPosition jp order by jp.id asc")
    List<JobPosition> findAll();
    JobPosition getJobPositionById(int id);
    @Query("select p from JobPosition p where lower(p.positionName) like lower(:string)")
    List<JobPosition> searchByPosition(@Param("string") String s);
}
