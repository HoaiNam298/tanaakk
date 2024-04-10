package kodlama.io.hrms.Dao;

import kodlama.io.hrms.entities.abstracts.User;
import kodlama.io.hrms.entities.concretes.Employer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);
    User getUserById(int id);
	void save(Employer employer);
}
