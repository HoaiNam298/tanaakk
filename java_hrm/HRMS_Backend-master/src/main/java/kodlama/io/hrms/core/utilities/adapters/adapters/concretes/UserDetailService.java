package kodlama.io.hrms.core.utilities.adapters.adapters.concretes;

import kodlama.io.hrms.Dao.UserDao;
import kodlama.io.hrms.dto.RegistrationUserDto;
import kodlama.io.hrms.entities.abstracts.User;
import kodlama.io.hrms.entities.concretes.Profile;
import kodlama.io.hrms.entities.concretes.Role;
import kodlama.io.hrms.service.ProfileService;
import kodlama.io.hrms.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserDetailService implements UserDetailsService {
    @Autowired
    private UserDao userRepository;
    @Autowired
    private RoleService roleService;
    @Qualifier("profileImpl")
    @Autowired
    private ProfileService service;


    public Optional<User> findByUsername(String username) {
        return userRepository.findByEmail(username);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
                String.format("not found user", username)
        ));
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList())
        );
    }

    public User createNewUser(RegistrationUserDto registrationUserDto) {
        User user = new User();
        user.setEmail(registrationUserDto.getEmail());
        user.setPassword( new BCryptPasswordEncoder().encode(registrationUserDto.getPassword()));
        user.setRoles(List.of(roleService.findByName()));
        Profile p=new Profile(user);
        service.save(p);
        return userRepository.save(user);
    }
    public User updateUser(User us) {
        return userRepository.save(us);
    }
    public List<Role> getAll(){
        return roleService.getAll();
    }
}
