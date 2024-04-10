package kodlama.io.hrms.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kodlama.io.hrms.Dao.SkillDao;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class SkillController {
	
	@Autowired
	SkillDao sk;
	
	@GetMapping("skill")
	public ResponseEntity<?> getAll() {
		
		return ResponseEntity.ok().body(sk.findAll());
	}
}
