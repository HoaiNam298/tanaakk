package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.JobPositionDao; 
import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.core.utilities.results.FailResult;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.core.utilities.results.SuccessDataResult;
import kodlama.io.hrms.core.utilities.results.SuccessResult;
import kodlama.io.hrms.entities.concretes.JobPosition;
import kodlama.io.hrms.entities.concretes.Skill;
import kodlama.io.hrms.service.JobPositionService;
import kodlama.io.hrms.service.constants.Messages;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobPositionImpl implements JobPositionService {

	@Autowired
	private JobPositionDao jobPositionDao;

	
//	public JobPositionManager(JobPositionDao jobPositionDao) {
//		this.jobPositionDao = jobPositionDao;
//	}

	@Override
	public DataResult<List<JobPosition>> getAll() {
		return new SuccessDataResult<List<JobPosition>>(Messages.DataListed, jobPositionDao.findAll());
	}

	@Override
	public List<JobPosition> searchByPosition(String position) {
		return jobPositionDao.searchByPosition(position);
	}

	@Override
	public Result add(JobPosition jobPosition) {

		if (jobPosition.getId() == 0) {
			return new FailResult(Messages.JobPositionManagerFaill);
		}

		if (jobPosition.getPositionName() == null || jobPosition.getPositionName().isEmpty()) {
			return new FailResult(Messages.JobPositionManagerFaill);
		}
		
		System.out.println(jobPosition.getId());
		System.out.println(jobPosition.getPositionName());
		System.out.println(jobPosition.getSkills());
		jobPosition.setSkills(jobPosition.getSkills());
		jobPositionDao.save(jobPosition);
		
		try {
			
			
			
			return new SuccessResult(Messages.JobPositionManagerAdded);
		} catch (Exception e) {
			e.printStackTrace(); // hoặc ghi log
			return new FailResult(Messages.JobPositionManagerFaill);
		}
	}

	@Override
	public Result getById(int id) {
		if (id == 0) {
			return new FailResult(Messages.JobPositionManagerFaill);
		}
		System.out.println(id);
		jobPositionDao.findById(id);
		Optional<JobPosition> jb = jobPositionDao.findById(id);
		if (jb.isPresent()) {
			JobPosition jobPosition = jb.get();
			return new SuccessDataResult<JobPosition>(Messages.DataListed, jobPosition);
		} 
		return new FailResult(Messages.JobPositionManagerFaill);
	}

	@Override
	public Result deleteById(int id) {
		if (id == 0) {
			return new FailResult(Messages.JobPositionManagerFaill);
		}
		jobPositionDao.deleteById(id);
		return new SuccessResult(Messages.JobPositionManagerAdded);
	}

	@Override
	public Result update(JobPosition jobPosition) {
		if (jobPosition.getId() == 0) {
			return new FailResult(Messages.JobPositionManagerFaill);
		}

		if (jobPosition.getPositionName() == null || jobPosition.getPositionName().isEmpty()) {
			return new FailResult(Messages.JobPositionManagerFaill);
		}
		try {
			jobPositionDao.save(jobPosition);
			return new SuccessResult(Messages.JobPositionManagerAdded);
		} catch (Exception e) {
			e.printStackTrace(); // hoặc ghi log
			return new FailResult(Messages.JobPositionManagerFaill);
		}
	}
}
