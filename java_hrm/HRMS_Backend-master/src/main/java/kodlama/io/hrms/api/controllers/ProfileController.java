package kodlama.io.hrms.api.controllers;

import kodlama.io.hrms.entities.abstracts.User;
import kodlama.io.hrms.entities.concretes.Profile;
import kodlama.io.hrms.service.ProfileService;
import kodlama.io.hrms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    @Qualifier("profileImpl")
    @Autowired
    private ProfileService service;
    @Autowired
    private UserService userService;
    @GetMapping("/{username}")
    public ResponseEntity<Profile> find(@PathVariable("username") String userName){
        Optional<Profile> p= service.findByUserName(userName);
        if(p.isPresent()){
            return new ResponseEntity<>(p.get(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(null,HttpStatus.OK);
        }
    }
    @PostMapping("/insert/{username}")
    public ResponseEntity<Profile> insert(@PathVariable("username") String userName, @RequestBody Profile profile){
        Optional<Profile> p= service.findByUserName(userName);
        Optional<User> u= userService.findByEmail(userName);
        if(p.isEmpty()){
            profile.setUser(u.get());
            service.save(profile);
            return new ResponseEntity<>(profile, HttpStatus.OK);
        }else {
            Profile p1= p.get();
            p1.setAddress(profile.getAddress());
            p1.setDescription(profile.getDescription());
            p1.setEmail(profile.getEmail());
            p1.setPhone(profile.getPhone());
            p1.setDateOfBirth(profile.getDateOfBirth());
            p1.setPathImage(profile.getPathImage());
            service.save(p1);
            return new ResponseEntity<>(p1,HttpStatus.OK);
        }
    }
}
