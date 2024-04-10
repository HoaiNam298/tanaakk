package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.*; 
import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.core.utilities.results.FailResult;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.core.utilities.results.SuccessDataResult;
import kodlama.io.hrms.core.utilities.results.SuccessResult;
import kodlama.io.hrms.entities.concretes.ActivationPanelForSystemUser;
import kodlama.io.hrms.entities.concretes.City;
import kodlama.io.hrms.entities.concretes.Job;
import kodlama.io.hrms.entities.concretes.JobPosition;
import kodlama.io.hrms.entities.concretes.WorkPlace;
import kodlama.io.hrms.entities.concretes.WorkTime;
import kodlama.io.hrms.entities.dtos.JobForAddDto;
import kodlama.io.hrms.entities.dtos.JobForGetAllDto;
import kodlama.io.hrms.entities.dtos.JobForUpdateDto;
import kodlama.io.hrms.service.JobService;
import kodlama.io.hrms.service.constants.Messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class JobImpl implements JobService {

    @Autowired
    private JobDao jobDao;
    @Autowired
    private ActivationPanelDao activationPanelDao;
    @Autowired
    private CityDao cityDao;
    @Autowired
    private WorkPlaceDao workPlaceDao;
    @Autowired
    private WorkTimeDao workTimeDao;
    @Autowired
    private EmployerDao employerDao;
    @Autowired
    private JobPositionDao jobPositionDao;

    @Override
    public DataResult<List<JobForGetAllDto>> getAll() {
        return new SuccessDataResult<List<JobForGetAllDto>>(Messages.DataListed, jobDao.getAllJobDtos());
    }

    @Override
    public List<JobForGetAllDto> searchByCity(String s) {
        return jobDao.searchByName(s);
    }

    @Override
    public DataResult<Job> getJobById(int id) {
        return new SuccessDataResult<Job>(Messages.DataListed, jobDao.getJobById(id));
    }

    @Override
    public Result setInactiveToJobVisibility(int id) {
        jobDao.setInactiveToJob(id);
        return new SuccessResult(Messages.JobIsInvisible);
    }

    @Override
    public Result setActiveToJobVisibility(int id) {
        jobDao.setActiveToJob(id);
        return new SuccessResult(Messages.JobIsVisible);
    }

    @Override
    public Result add(JobForAddDto jobForAddDto) {
        Job job = new Job();
        job.setActive(true);
        job.setMinimumSalary(jobForAddDto.getMinimumSalary());
        job.setMaximumSalary(jobForAddDto.getMaximumSalary());
        job.setCreatedDate(LocalDate.now());
        job.setDeadline(jobForAddDto.getDeadline());
        job.setEmpty_positions(jobForAddDto.getNumberOfEmptyPositions());
        job.setDescription(jobForAddDto.getDescription());

        job.setCity(this.cityDao.getCityById(jobForAddDto.getCityId()));
        job.setEmployer(this.employerDao.getEmployerById(jobForAddDto.getEmployerId()));
        job.setWorkPlace(this.workPlaceDao.getById(jobForAddDto.getWorkPlaceId()));
        job.setWorkTime(this.workTimeDao.getById(jobForAddDto.getWorkTimeId()));
        job.setJobPosition(this.jobPositionDao.getJobPositionById(jobForAddDto.getJobPositionId()));

        ActivationPanelForSystemUser activationPanelForSystemUser = new
                ActivationPanelForSystemUser(null,job,new Date(),false,null);
        activationPanelDao.save(activationPanelForSystemUser);
        jobDao.save(job);
        return new SuccessResult(Messages.JobAdded);
    }
    
    @Override
    public Result update(int id, JobForAddDto updatedJob) {
    	if (id <= 0 || updatedJob == null) {
            return new FailResult(Messages.JobNotFound);
        }

        Job job = jobDao.getJobById(id);
        if (job == null) {
            return new FailResult(Messages.JobNotFound);
        }

        job.setMinimumSalary(updatedJob.getMinimumSalary());
        job.setMaximumSalary(updatedJob.getMaximumSalary());
        job.setDeadline(updatedJob.getDeadline());
        job.setEmpty_positions(updatedJob.getNumberOfEmptyPositions());
        job.setDescription(updatedJob.getDescription());
        
        job.setCity(this.cityDao.getCityById(updatedJob.getCityId()));
        job.setWorkPlace(this.workPlaceDao.getById(updatedJob.getWorkPlaceId()));
        job.setWorkTime(this.workTimeDao.getById(updatedJob.getWorkTimeId()));
        job.setJobPosition(this.jobPositionDao.getJobPositionById(updatedJob.getJobPositionId()));

        jobDao.save(job);

        return new SuccessResult(Messages.JobUpdated);
    }


    @Override
    public Result delete(int id) {
    	ActivationPanelForSystemUser activationPanel = activationPanelDao.getActivationPanelForSystemUserByJobId_Id(id);
    	Job job = jobDao.getJobById(id);

    	if (activationPanel != null) {
    	    activationPanelDao.delete(activationPanel);
    	}

    	if (job != null) {
    	    jobDao.delete(job);
    	}

        return new SuccessResult(Messages.JobDeleted);
    }

}
