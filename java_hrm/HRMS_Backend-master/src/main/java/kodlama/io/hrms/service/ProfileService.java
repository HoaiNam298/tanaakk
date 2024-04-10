package kodlama.io.hrms.service;

import kodlama.io.hrms.entities.concretes.Profile;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ProfileService {
    List<Profile> getAll();
    Optional<Profile> findById(Long id);
    Profile save(Profile profile);
    Optional<Profile> findByUserName(String username);
}
