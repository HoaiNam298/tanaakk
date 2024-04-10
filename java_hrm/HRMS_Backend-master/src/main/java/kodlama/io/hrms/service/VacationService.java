package kodlama.io.hrms.service;

import kodlama.io.hrms.entities.concretes.Vacation;
import kodlama.io.hrms.entities.concretes.VacationEmployee;
import kodlama.io.hrms.entities.enums.VacationType;

import java.util.List;
import java.util.Optional;

public interface VacationService {
    List<Vacation> getAll();
    Optional<Vacation> findById(Long id);
    Vacation save(Vacation vacation);
    List<Vacation> findByEmpId(Long id);
    Optional<Vacation> findByVacationType(VacationType vacationType);
    void delete(Vacation vacation);
}
