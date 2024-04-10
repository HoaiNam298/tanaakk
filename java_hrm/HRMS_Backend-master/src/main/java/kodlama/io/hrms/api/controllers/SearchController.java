package kodlama.io.hrms.api.controllers;

import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.dto.SearchDTO;
import kodlama.io.hrms.entities.concretes.Employer;
import kodlama.io.hrms.entities.concretes.JobPosition;
import kodlama.io.hrms.entities.concretes.JobSeeker;
import kodlama.io.hrms.entities.dtos.JobForGetAllDto;
import kodlama.io.hrms.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SearchController {
    @Autowired
    private JobService jobService;
    @Autowired
    private JobSeekerService jobSeekerService;
    @Autowired
    private JobPositionService jobPositionService;
    @Autowired
    private EmployerService employerService;
    @PostMapping("/search")
    public ResponseEntity<SearchDTO> searchByName(@RequestBody Map<String,String> s){
        String search = s.get("search");
        List<JobForGetAllDto> jobs = jobService.searchByCity("%" + search + "%");
        List<JobSeeker> jobSeekers = jobSeekerService.searchByName("%" + search + "%");
        List<JobPosition> jobPosition = jobPositionService.searchByPosition("%" + search + "%");
        List<Employer> emp = employerService.searchByCompanyName("%" + search + "%");
        SearchDTO dto= new SearchDTO(jobs,jobSeekers,emp,jobPosition);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
