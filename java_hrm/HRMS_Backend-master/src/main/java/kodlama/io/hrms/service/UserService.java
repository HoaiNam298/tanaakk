package kodlama.io.hrms.service;

import kodlama.io.hrms.entities.abstracts.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);
    List<User> getAll();
    User save(User user);
}
