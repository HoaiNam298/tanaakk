package kodlama.io.hrms.api.controllers;

import kodlama.io.hrms.Dao.UserDao;
import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.entities.abstracts.User;
import kodlama.io.hrms.entities.concretes.Employer;
import kodlama.io.hrms.entities.dtos.EmployerForAddDto;
import kodlama.io.hrms.service.EmployerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employers/")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployerController {
	@Autowired
    private EmployerService employerService;
	@Autowired
    private UserDao userDao;

    @PostMapping("add")
    public Result add(@RequestBody Employer employer ) throws Exception{
        return employerService.add(employer);
    }
    
    @PostMapping("update")
    public Result update(@RequestParam int id, @RequestBody Employer employer ){
        return employerService.updateEmployer(id, employer);
    }
    
    @GetMapping("delete")
    public Result delete(@RequestParam int id){
        return this.employerService.delete(id);
    }

    @GetMapping("getall")
    public DataResult<List<Employer>> getAll() {
        return employerService.getAll();
    }

    @GetMapping("getbyid")
    public ResponseEntity<?> getById(@RequestParam int id ){
        return ResponseEntity.ok(employerService.getById(id));
    }
    
    @GetMapping("getbyemail")
    public ResponseEntity<?> getByEmail(@RequestParam String email ){
        return ResponseEntity.ok(userDao.findByEmail(email));
    }
}
