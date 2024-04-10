package kodlama.io.hrms.api.controllers;

import kodlama.io.hrms.entities.concretes.Employee;
import kodlama.io.hrms.entities.concretes.Vacation;
import kodlama.io.hrms.entities.concretes.VacationEmployee;
import kodlama.io.hrms.entities.dtos.VacationDto;
import kodlama.io.hrms.entities.enums.VacationStatus;
import kodlama.io.hrms.entities.enums.VacationType;
import kodlama.io.hrms.entities.key.VacEmpKey;
import kodlama.io.hrms.service.EmployeeService;
import kodlama.io.hrms.service.VacationEmployeeService;
import kodlama.io.hrms.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api/vacation")
@CrossOrigin(origins = "http://localhost:3000")
public class VacationController {
    @Autowired
    private VacationService vacationService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private VacationEmployeeService service;

    @PostMapping("/insert/{emp_id}")
    public ResponseEntity<String> insert(@RequestBody VacationDto vacationDto, @PathVariable("emp_id") Long id) {

        System.out.println(vacationDto.getVacationType());
        Optional<Employee> em = employeeService.findById(id);
        if (em.isEmpty()) {
            return new ResponseEntity<>("error", HttpStatus.OK);
        }
        Vacation v = new Vacation(VacationType.valueOf(vacationDto.getVacationType().toString())
                ,vacationDto.getVacationName(), vacationDto.getDayOff(),vacationDto.getFromDate(),vacationDto.getToDate(),vacationDto.getNote(), VacationStatus.ACTIVE);
        vacationService.save(v);
        VacEmpKey key = new VacEmpKey(em.get(), v);
        VacationEmployee ve = new VacationEmployee(key, VacationStatus.ACTIVE);
        service.save(ve);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @PostMapping("/update/{emp_id}/{id}")
    public ResponseEntity<String> update(@RequestBody Vacation vacationDto, @PathVariable("emp_id") Long emp_id, @PathVariable("id") Long id) {
        Optional<Employee> em = employeeService.findById(emp_id);
        Optional<Vacation> v= vacationService.findById(id);
        if (em.isEmpty()||v.isEmpty()) {
            return new ResponseEntity<>("error", HttpStatus.OK);
        }
        Vacation vc = new Vacation(id,VacationType.valueOf(vacationDto.getVacationType().toString())
                ,vacationDto.getVacationName(), vacationDto.getDayOff(),vacationDto.getFromDate(),vacationDto.getToDate(),vacationDto.getNote(), VacationStatus.ACTIVE);
        vacationService.save(vc);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        Optional<Vacation> v = vacationService.findById(id);
        if (v.isEmpty())
            return new ResponseEntity<>("error", HttpStatus.OK);
        vacationService.delete(v.get());
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Vacation> findVacation(@PathVariable("id") Long id) {
        Optional<Vacation> v = vacationService.findById(id);
        if (v.isEmpty())
            return new ResponseEntity<>(null, HttpStatus.OK);
        return new ResponseEntity<>(v.get(), HttpStatus.OK);
    }
}
