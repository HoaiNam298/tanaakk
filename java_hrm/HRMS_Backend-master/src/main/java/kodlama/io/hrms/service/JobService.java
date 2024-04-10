package kodlama.io.hrms.service;

import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.entities.concretes.Job;
import kodlama.io.hrms.entities.dtos.JobForAddDto;
import kodlama.io.hrms.entities.dtos.JobForGetAllDto;
import kodlama.io.hrms.entities.dtos.JobForUpdateDto;

import java.util.List;

public interface JobService {

    DataResult<List<JobForGetAllDto>> getAll();
    
    List<JobForGetAllDto> searchByCity(String s);

    DataResult<Job> getJobById(int id);

    Result setInactiveToJobVisibility(int id);

    Result setActiveToJobVisibility(int id);

    Result add(JobForAddDto job);

    Result delete(int id);

	Result update(int id, JobForAddDto updatedJobDto);

}
