package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.RoleDao;
import kodlama.io.hrms.entities.concretes.Role;
import kodlama.io.hrms.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleImpl implements RoleService {
    @Autowired
    private RoleDao dao;
    @Override
    public Role findByName() {
        return dao.findByName("ROLE_USER");
    }

    @Override
    public List<Role> getAll() {
        return dao.findAll();
    }

    @Override
    public Role save(Role role) {
        return dao.save(role);
    }

	@Override
	public Role findByNameEmployer() {
		return dao.findByName("ROLE_EMPLOYER");
	}
}
