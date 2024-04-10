package kodlama.io.hrms.api.controllers;

import kodlama.io.hrms.entities.concretes.Employee;
import kodlama.io.hrms.entities.concretes.Vacation;
import kodlama.io.hrms.entities.concretes.VacationEmployee;
import kodlama.io.hrms.entities.dtos.EmployeeDto;
import kodlama.io.hrms.entities.dtos.EmployeeVacationDto;
import kodlama.io.hrms.service.EmployeeService;
import kodlama.io.hrms.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/employees")
public class EmployeeController {
    @Qualifier("employeeImpl")
    @Autowired
    private EmployeeService service;
    @Autowired
    private VacationService vacationService;
    @GetMapping("/getAll")
    public ResponseEntity<List<EmployeeDto> > getAll(){
        List<EmployeeDto> l = service.getAll();
        return new ResponseEntity<>(l, HttpStatus.OK);
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id){
        Optional<Employee> e = service.findById(id);
        if(e.isPresent()){
            service.delete(e.get());
            return new ResponseEntity<>("success",HttpStatus.OK);
        }
        return new ResponseEntity<>("error",HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeVacationDto> findById(@PathVariable("id") Long id){
        Optional<Employee> e = service.findById(id);
        List<Vacation> v= vacationService.findByEmpId(id);
        if(e.isPresent()){
            EmployeeVacationDto dto = new EmployeeVacationDto(e.get(),v);
            return new ResponseEntity<>(dto,HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Employee employee){
        Optional<Employee> e = service.findByEmail(employee.getEmail());
        if(e.isPresent()){
            return new ResponseEntity<>("exist",HttpStatus.OK);
        }
        if(employee!=null){
            service.save(employee);
            return new ResponseEntity<>("success",HttpStatus.OK);
        }
        return new ResponseEntity<>("error",HttpStatus.OK);
    }
    @PostMapping("/update/{id}")
    public ResponseEntity<String> update(@RequestBody Employee employee, @PathVariable("id") Long id){
        Optional<Employee> e = service.findById(id);
        if(e.isEmpty()){
            return new ResponseEntity<>("errorUpdate",HttpStatus.OK);
        }
        if(employee!=null){
            Employee em = e.get();
            em.setAddress(employee.getAddress());
            em.setName(employee.getName());
            em.setStatus(employee.getStatus());
            em.setEmail(employee.getEmail());
            em.setPhone(employee.getPhone());
            em.setSalary(employee.getSalary());
            em.setDateOfBirth(employee.getDateOfBirth());
            service.save(em);
            return new ResponseEntity<>("success",HttpStatus.OK);
        }
        return new ResponseEntity<>("error",HttpStatus.OK);
    }


}
