package kodlama.io.hrms.service;

import kodlama.io.hrms.Dao.EmployerDao;
import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.entities.concretes.Employer;
import kodlama.io.hrms.entities.dtos.EmployerDto;
import kodlama.io.hrms.entities.dtos.EmployerForAddDto;

import java.util.List;

public interface EmployerService {

    Result add(Employer employer) throws Exception;
    DataResult<List<Employer>> getAll();
    List<Employer> searchByCompanyName(String s);
    DataResult<Employer> getById(int id);
	Result delete(int id);
	Result updateEmployer(int id, Employer updatedEmployer);
	int maxRoleId();

}
