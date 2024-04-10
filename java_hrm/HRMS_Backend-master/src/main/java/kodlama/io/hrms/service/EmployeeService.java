package kodlama.io.hrms.service;

import kodlama.io.hrms.entities.concretes.Employee;
import kodlama.io.hrms.entities.dtos.EmployeeDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface EmployeeService {
    List<EmployeeDto> getAll();
    Optional<Employee> findById(Long id);
    Employee save(Employee employee);
    void delete(Employee employee);
    Optional<Employee> findByEmail(String email);
}
