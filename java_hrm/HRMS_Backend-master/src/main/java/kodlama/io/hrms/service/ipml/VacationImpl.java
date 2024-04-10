package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.VacationDao;
import kodlama.io.hrms.entities.concretes.Vacation;
import kodlama.io.hrms.entities.concretes.VacationEmployee;
import kodlama.io.hrms.entities.enums.VacationStatus;
import kodlama.io.hrms.entities.enums.VacationType;
import kodlama.io.hrms.service.VacationService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VacationImpl implements VacationService {
    @Autowired
    private VacationDao repository;
    @Override
    public List<Vacation> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Vacation> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Vacation save(Vacation vacation) {
        return repository.save(vacation);
    }

    @Override
    public List<Vacation> findByEmpId(Long id) {
        return repository.findByEmpId(id);
    }

    @Override
    public Optional<Vacation> findByVacationType(VacationType vacationType) {
        return repository.findByVacationType(vacationType);
    }

    @Override
    public void delete(Vacation vacation) {
        vacation.setStatus(VacationStatus.DELETE);
        repository.save(vacation);
    }
}
