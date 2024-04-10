package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.VacationEmployeeDao;
import kodlama.io.hrms.entities.concretes.Vacation;
import kodlama.io.hrms.entities.concretes.VacationEmployee;
import kodlama.io.hrms.entities.enums.VacationStatus;
import kodlama.io.hrms.entities.key.VacEmpKey;
import kodlama.io.hrms.service.VacationEmployeeService;
import kodlama.io.hrms.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class VacationEmployeeImpl implements VacationEmployeeService {
    @Autowired
    private VacationEmployeeDao repository;

    @Override
    public VacationEmployee save(VacationEmployee vacationEmployee) {
        return repository.save(vacationEmployee);
    }

    @Override
    public Optional<VacationEmployee> findById(VacEmpKey id) {
        return repository.findById(id);
    }

    @Override
    public void delete(VacationEmployee vacationEmployee) {
        vacationEmployee.setStatus(VacationStatus.DELETE);
        repository.save(vacationEmployee);
    }
}