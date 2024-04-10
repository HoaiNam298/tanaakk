package kodlama.io.hrms.service;


import kodlama.io.hrms.entities.concretes.Role;

import java.util.List;

public interface RoleService {
    Role findByName();
    Role findByNameEmployer();
    List<Role> getAll();
    Role save(Role role);
}
