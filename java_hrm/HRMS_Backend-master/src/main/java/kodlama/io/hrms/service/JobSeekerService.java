package kodlama.io.hrms.service;


import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.entities.concretes.JobSeeker;

import java.util.List;

public interface JobSeekerService {

//    Result add(JobSeeker jobSeeker);

    DataResult<List<JobSeeker>> getAll();
    List<JobSeeker> searchByName(String s);

    DataResult<JobSeeker> getById(int id);

    DataResult<List<JobSeeker>> getAllByWorkingExperience();

}
