package kodlama.io.hrms.api.controllers;

import kodlama.io.hrms.core.utilities.adapters.adapters.concretes.UserDetailService;
import kodlama.io.hrms.entities.abstracts.User;
import kodlama.io.hrms.entities.concretes.Role;
import kodlama.io.hrms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/users")
public class UserController {
    @Autowired
    private UserService service;
    @Autowired
    private UserDetailService userDetailService;

    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAll(){
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }
    @PostMapping("/grant")
    public ResponseEntity<String> update(@RequestBody List<User> users){

        for(User user:users){
            service.save(user);
        }
        return new ResponseEntity<>("success",HttpStatus.OK);
    }
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getRoleAll(){
        return new ResponseEntity<>(userDetailService.getAll(),HttpStatus.OK);
    }
}
