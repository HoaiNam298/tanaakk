package kodlama.io.hrms.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kodlama.io.hrms.service.WorkTimeService;

@RestController
@RequestMapping("/api/worktimes/")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkTimesController {

    private WorkTimeService workTimeService;

    @Autowired
    public WorkTimesController(WorkTimeService workTimeService) {
        this.workTimeService = workTimeService;
    }

    @GetMapping("getall")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(this.workTimeService.getAll());
    }

    @GetMapping("getById")
    public ResponseEntity<?> getById(int id){
        return ResponseEntity.ok(this.workTimeService.getById(id));
    }
}
