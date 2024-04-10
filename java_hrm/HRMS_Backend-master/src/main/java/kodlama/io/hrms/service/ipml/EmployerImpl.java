package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.EmployerDao;
import kodlama.io.hrms.Dao.UserDao;
import kodlama.io.hrms.core.utilities.adapters.adapters.abstracts.EmailVerificationService;
import kodlama.io.hrms.entities.abstracts.User;
import kodlama.io.hrms.entities.concretes.Employer;
import kodlama.io.hrms.entities.dtos.EmployerDto;
import kodlama.io.hrms.entities.dtos.EmployerForAddDto;
import kodlama.io.hrms.service.EmployerService;
import kodlama.io.hrms.service.RoleService;
import kodlama.io.hrms.service.constants.Messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import kodlama.io.hrms.core.utilities.results.*;
import kodlama.io.hrms.dto.RegistrationUserDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmployerImpl implements EmployerService {
    @Autowired
    private EmployerDao employerDao;

    @Autowired
    private EmailVerificationService emailVerification;

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleService roleService;

    @Override
    public Result add(Employer employer) {
        Optional<User> existingUser = userDao.findByEmail(employer.getUser().getEmail());
        if (existingUser.isPresent()) {
            employer.setJoinDate(LocalDate.now());
            employerDao.save(employer);
            return new SuccessResult(Messages.EmployerAdded);
        } else {
            employer.getUser().setActivated(false);
            employer.getUser().setCreatedDate(LocalDate.now());
            employer.getUser().setPassword(new BCryptPasswordEncoder().encode(employer.getUser().getPassword()));
            employer.setJoinDate(LocalDate.now());
            employer.getUser().setRoles(List.of(roleService.findByNameEmployer()));

            userDao.save(employer.getUser());
            employer.setJoinDate(LocalDate.now());
            employerDao.save(employer);

            return new SuccessResult(Messages.EmployerAdded);
        }
    }

    @Override
    public DataResult<List<Employer>> getAll() {
        return new SuccessDataResult<List<Employer>>(Messages.DataListed, employerDao.findAll());
    }

    @Override
    public List<Employer> searchByCompanyName(String s) {
        return employerDao.searchByName(s);
    }

    @Override
    public DataResult<Employer> getById(int id) {
        return new SuccessDataResult<Employer>(Messages.DataListed, this.employerDao.getEmployerById(id));
    }

    @Override
    public Result delete(int id) {
        Optional<Employer> employerOptional = employerDao.findById(id);

        if (employerOptional.isPresent()) {
            Employer employer = employerOptional.get();
            User user = employer.getUser();

            if (user != null) {

                employer.setUser(null);

                employerDao.deleteById(id);

                return new SuccessResult(Messages.EmployerDeleted);
            } else {
                return new FailResult("User associated with the employer is null.");
            }
        } else {
            return new FailResult(Messages.EmployerNotFound);
        }
    }

    @Override
    public Result updateEmployer(int id, Employer updatedEmployer) {

        // if
        // (userDao.findByEmail(updatedEmployer.getUser().getEmail()).stream().count()
        // == 0) {
        // return new FailResult(Messages.EmployerNotFound);
        // }

        updatedEmployer.setCompanyName(updatedEmployer.getCompanyName());
        updatedEmployer.setPhone(updatedEmployer.getPhone());
        updatedEmployer.setWebSites(updatedEmployer.getWebSites());
        updatedEmployer.setJoinDate(LocalDate.now());

        employerDao.save(updatedEmployer);

        return new SuccessResult(Messages.EmployerUpdated);
    }

    @Override
    public int maxRoleId() {
        return employerDao.maxEmployerId();
    }

}
