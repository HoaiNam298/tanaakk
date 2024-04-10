package kodlama.io.hrms.Dao;

import kodlama.io.hrms.entities.concretes.SystemUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemUserDao extends JpaRepository<SystemUser,Integer> {

    SystemUser getById(int id);

}
