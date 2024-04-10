package kodlama.io.hrms.service;

import java.util.List;

import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.entities.concretes.JobPosition;
import kodlama.io.hrms.entities.concretes.Skill;

public interface SkillService {
	
	DataResult<List<Skill>> getAll();

	Result getById(int id);

	Result deleteById(int id);

	Result add(JobPosition jobPosition);

	Result update(JobPosition jobPosition);

}
