package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.ProfileDao;
import kodlama.io.hrms.entities.concretes.Profile;
import kodlama.io.hrms.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ProfileImpl implements ProfileService {
    @Autowired
    private ProfileDao dao;
    @Override
    public List<Profile> getAll() {
        return dao.findAll();
    }

    @Override
    public Optional<Profile> findById(Long id) {
        return dao.findById(id);
    }

    @Override
    public Profile save(Profile profile) {
        return dao.save(profile);
    }

    @Override
    public Optional<Profile> findByUserName(String username) {
        return dao.findByUserId(username);
    }
}
