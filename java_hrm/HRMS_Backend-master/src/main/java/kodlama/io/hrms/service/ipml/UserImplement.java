package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.UserDao;
import kodlama.io.hrms.entities.abstracts.User;
import kodlama.io.hrms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserImplement implements UserService {
    @Autowired
    private UserDao userDao;
    @Override
    public Optional<User> findByEmail(String email) {
        return userDao.findByEmail(email);
    }

    @Override
    public List<User> getAll() {
        return userDao.findAll();
    }

    @Override
    public User save(User user) {
        return userDao.save(user);
    }
}
