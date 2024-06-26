package kodlama.io.hrms.api.controllers;

 
import kodlama.io.hrms.entities.concretes.City;
import kodlama.io.hrms.service.CityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/cities/")
@CrossOrigin(origins = "http://localhost:3000")
public class CityController {

    private CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @PostMapping("add")
    public ResponseEntity<?> add(City city){
        return ResponseEntity.ok(this.cityService.add(city));
    }

    @PostMapping("update")
    public ResponseEntity<?> update(City city){
        return ResponseEntity.ok(this.cityService.update(city));
    }

    @PostMapping("delete")
    public ResponseEntity<?> delete(City city){
        return ResponseEntity.ok(this.cityService.delete(city));
    }

    @GetMapping("getAll")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(this.cityService.getAll());
    }

}
