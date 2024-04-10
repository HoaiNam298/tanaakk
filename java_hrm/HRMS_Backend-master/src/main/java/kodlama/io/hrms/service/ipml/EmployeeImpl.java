package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.EmployeeDao;
import kodlama.io.hrms.entities.concretes.Employee;
import kodlama.io.hrms.entities.dtos.EmployeeDto;
import kodlama.io.hrms.entities.enums.EmployeeStatus;
import kodlama.io.hrms.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Component
public class EmployeeImpl implements EmployeeService {
    @Autowired
    private EmployeeDao repository;
    @Override
    public List<EmployeeDto> getAll() {
        return repository.getAll(EmployeeStatus.ACTIVE);
    }

    @Override
    public Optional<Employee> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Employee save(Employee employee) {
        return repository.save(employee);
    }

    @Override
    public void delete(Employee employee) {
        employee.setStatus(EmployeeStatus.DELETE);
        repository.save(employee);
    }

    @Override
    public Optional<Employee> findByEmail(String email) {
        return repository.findByEmail(email);
    }

}
