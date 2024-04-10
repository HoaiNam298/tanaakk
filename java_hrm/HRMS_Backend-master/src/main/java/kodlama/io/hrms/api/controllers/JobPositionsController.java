package kodlama.io.hrms.api.controllers;

import kodlama.io.hrms.Dao.JobPositionDao;
import kodlama.io.hrms.Dao.JobSkillDao;
import kodlama.io.hrms.Dao.SkillDao;
import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.entities.concretes.JobPosition;
import kodlama.io.hrms.service.JobPositionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class JobPositionsController {

	@Autowired
	private JobPositionService jobPositionService;	
	@Autowired
	JobSkillDao jobdao;
	
	@Autowired
	JobPositionDao dt;

	@GetMapping("jobpositions")
	public ResponseEntity<?> getAll() {
		
		return ResponseEntity.ok().body(jobPositionService.getAll());
	}

	@GetMapping("jobpositions-by-id")
	public ResponseEntity<?> getById(@RequestParam int id) {
		return ResponseEntity.ok().body(jobPositionService.getById(id));
	}

	@DeleteMapping("jobpositions-by-id")
	public ResponseEntity<?> deleteById(@RequestParam int id) {
		System.out.println(id);
		return ResponseEntity.ok().body(jobPositionService.deleteById(id));
	}

	@PostMapping("jobpositions") /// nhân request từ clien là post
	public ResponseEntity<?> add(@RequestBody JobPosition jobPosition) {
		
		
		
		return ResponseEntity.ok().body(jobPositionService.add(jobPosition));
	}
	
	@PutMapping("jobpositions") /// nhân request từ clien là post
	public ResponseEntity<?> update(@RequestBody JobPosition jobPosition) {
		return ResponseEntity.ok().body(jobPositionService.update(jobPosition));
	}

}
