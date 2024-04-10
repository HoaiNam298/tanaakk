package kodlama.io.hrms.api.controllers;

import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.entities.concretes.Job;
import kodlama.io.hrms.entities.dtos.JobForAddDto;
import kodlama.io.hrms.entities.dtos.JobForGetAllDto;
import kodlama.io.hrms.entities.dtos.JobForUpdateDto;
import kodlama.io.hrms.service.JobService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/api/jobs/")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

    @Autowired
    private JobService jobService;


    @GetMapping("getall")
    public DataResult<List<JobForGetAllDto>> getAll() {
        return this.jobService.getAll();
    }

    @GetMapping("getjobbyid")
    public ResponseEntity<?> getJobById(@RequestParam int id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @Transactional
    @PostMapping("setinactivetojobvisibility")
    public Result setInactiveToJobVisibility(@RequestParam int id) {
        return this.jobService.setInactiveToJobVisibility(id);
    }

    @Transactional
    @PostMapping("setactivetojobvisibility")
    public Result setActiveToJobVisibility(@RequestParam int id) {
        return this.jobService.setActiveToJobVisibility(id);
    }

    @PostMapping("add")
    public Result add(@RequestBody JobForAddDto JobForAddDto){
        return this.jobService.add(JobForAddDto);
    }

    @GetMapping("delete")
    public Result delete(@RequestParam int id){
        return this.jobService.delete(id);
    }
    
    @PostMapping("update")
    public Result update(@RequestParam int id,@RequestBody JobForAddDto job){
        return this.jobService.update(id, job);
    }
}
