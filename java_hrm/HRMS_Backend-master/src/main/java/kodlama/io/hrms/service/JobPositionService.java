package kodlama.io.hrms.service;

import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.entities.concretes.JobPosition;

import java.util.List;

public interface JobPositionService {
	DataResult<List<JobPosition>> getAll();
	List<JobPosition> searchByPosition(String position);

	Result getById(int id);

	Result deleteById(int id);

	Result add(JobPosition jobPosition);

	Result update(JobPosition jobPosition);
}
