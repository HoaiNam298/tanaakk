package kodlama.io.hrms.service;

import kodlama.io.hrms.entities.concretes.VacationEmployee;
import kodlama.io.hrms.entities.key.VacEmpKey;

import java.util.Optional;

public interface VacationEmployeeService {
    VacationEmployee save(VacationEmployee vacationEmployee);
    Optional<VacationEmployee> findById(VacEmpKey id);
    void delete(VacationEmployee vacationEmployee);
}
