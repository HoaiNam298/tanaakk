package kodlama.io.hrms.Dao;

import kodlama.io.hrms.entities.concretes.Job;
import kodlama.io.hrms.entities.dtos.JobForGetAllDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobDao extends JpaRepository<Job, Integer> {

    @Query("select new kodlama.io.hrms.entities.dtos.JobForGetAllDto" +
            "(j.id , j.minimumSalary, j.maximumSalary, j.empty_positions, p.positionName , c.cityName ,j.createdDate, j.deadline, wp.workPlaceName, wt.workTimeName, j.description, j.isActive ,apf.isApproved )" +
            " from ActivationPanelForSystemUser apf " +
            " inner join apf.job j" +
            " inner join j.jobPosition p" +
            " inner join j.city c " +
            " inner join j.workPlace wp" +
            " inner join j.workTime wt" )
    List<JobForGetAllDto> getAllJobDtos();

    List<Job> getAllByIsActiveTrueAndEmployer_Id(int id);

    Job getJobById(int id);

    @Modifying
    @Query("UPDATE Job SET isActive = false WHERE id =:id")
    void setInactiveToJob(@Param("id") int id);

    @Modifying
    @Query("UPDATE Job SET isActive = true WHERE id =:id")
    void setActiveToJob(@Param("id") int id);
    @Query("select new kodlama.io.hrms.entities.dtos.JobForGetAllDto" +
            "(j.id , j.minimumSalary, j.maximumSalary, j.empty_positions, p.positionName , c.cityName ,j.createdDate, j.deadline, wp.workPlaceName, wt.workTimeName, j.description, j.isActive ,apf.isApproved )" +
            " from ActivationPanelForSystemUser apf " +
            " inner join apf.job j" +
            " inner join j.jobPosition p" +
            " inner join j.city c " +
            " inner join j.workPlace wp" +
            " inner join j.workTime wt" +
            " where lower(c.cityName) like lower(:s)")
    List<JobForGetAllDto> searchByName(@Param("s") String s);

	void save(JobForGetAllDto job);
}
