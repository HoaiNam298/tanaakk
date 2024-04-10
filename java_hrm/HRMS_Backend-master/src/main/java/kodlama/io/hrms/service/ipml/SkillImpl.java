package kodlama.io.hrms.service.ipml;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kodlama.io.hrms.Dao.SkillDao;
import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.core.utilities.results.SuccessDataResult;
import kodlama.io.hrms.core.utilities.results.SuccessResult;
import kodlama.io.hrms.entities.concretes.JobPosition;
import kodlama.io.hrms.entities.concretes.Skill;
import kodlama.io.hrms.service.SkillService;
import kodlama.io.hrms.service.constants.Messages;

@Service
public class SkillImpl implements SkillService{
	
	@Autowired
	SkillDao skillDao;
	
	@Override
	public DataResult<List<Skill>> getAll() {
//		return new SuccessDataResult<List<Skill>>(skillDao.findAll());
		return new SuccessDataResult<List<Skill>>(Messages.DataListed, skillDao.findAll());
	}

	@Override
	public Result getById(int id) {
		// TODO Auto-generated method stub
		Optional<Skill> skill  = skillDao.findById(id);
		
		return null;
	}

	@Override
	public Result deleteById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result add(JobPosition jobPosition) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result update(JobPosition jobPosition) {
		// TODO Auto-generated method stub
		return null;
	}

}
