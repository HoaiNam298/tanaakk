package kodlama.io.hrms.api.controllers;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kodlama.io.hrms.Dao.JobPositionDao;
import kodlama.io.hrms.Dao.JobSkillDao;
import kodlama.io.hrms.Dao.SkillDao;
import kodlama.io.hrms.dto.JobPositionDTO;
import kodlama.io.hrms.entities.concretes.JobPosition;
import kodlama.io.hrms.entities.concretes.JobPositionSkill;
import kodlama.io.hrms.entities.concretes.Skill;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class JobPositonSkillController {
	
	@Autowired
	private SkillDao skillDao;
	@Autowired
	private JobSkillDao jobSkill;
	@Autowired
	private JobPositionDao jobDao;
	
	@GetMapping("jobskill")
	public ResponseEntity<?> getAllSkill() {
		return ResponseEntity.ok().body(jobSkill.findAll());
	}
	
	@GetMapping("/jobskill/{positionId}")
	public ResponseEntity<?> getSkillsForPosition(@PathVariable Integer positionId) {
		
		Map<String, Object> data = new HashMap<>();
		data.put("jobPosition", jobDao.findById(positionId));
		data.put("skill", skillDao.findSkillPosition(positionId));
	    return ResponseEntity.ok().body(data);
	}
	@PostMapping("/jobskill")
	public ResponseEntity<?> addSkillsForPosition(@RequestBody JobPositionDTO jobPosition) {
		
		
		JobPosition jb = new JobPosition();
		jb.setId(jobPosition.getId());
		jb.setPositionName(jobPosition.getPositionName());
		Set<Skill> setFromList = new HashSet<>(jobPosition.getSkills());
		jb.setSkills(setFromList);
		
		jobDao.save(jb);
		
	    return ResponseEntity.ok().body(jobPosition);
	}
}
