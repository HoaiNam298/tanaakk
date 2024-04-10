package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.config.JwtTokenUtils;
import kodlama.io.hrms.core.utilities.adapters.adapters.concretes.UserDetailService;
import kodlama.io.hrms.core.utilities.results.MError;
import kodlama.io.hrms.dto.JwtRequest;
import kodlama.io.hrms.dto.JwtResponse;
import kodlama.io.hrms.dto.RegistrationUserDto;
import kodlama.io.hrms.dto.UserDto;
import kodlama.io.hrms.entities.abstracts.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private UserDetailService userService;
    @Autowired
    private final JwtTokenUtils jwtTokenUtils;
    @Autowired
    private final AuthenticationManager authenticationManager;

//    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) {
//        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
//        } catch (BadCredentialsException e) {
//            return new ResponseEntity<>(new MError(HttpStatus.UNAUTHORIZED.value(), "Неправильный логин или пароль"), HttpStatus.UNAUTHORIZED);
//        }
//        UserDetails userDetails = userService.loadUserByUsername(authRequest.getUsername());
//        String token = jwtTokenUtils.generateToken(userDetails);
//        return ResponseEntity.ok(new JwtResponse(token));
//    }

    public ResponseEntity<?> createNewUser(@RequestBody RegistrationUserDto registrationUserDto) {
        if (!registrationUserDto.getPassword().equals(registrationUserDto.getConfirmPassword())) {
            return new ResponseEntity<>(new MError(HttpStatus.BAD_REQUEST.value(), "Пароли не совпадают"), HttpStatus.BAD_REQUEST);
        }
        if (userService.findByUsername(registrationUserDto.getEmail()).isPresent()) {
            return new ResponseEntity<>(new MError(HttpStatus.BAD_REQUEST.value(), "Пользователь с указанным именем уже существует"), HttpStatus.BAD_REQUEST);
        }
        User user = userService.createNewUser(registrationUserDto);
        return ResponseEntity.ok(new UserDto(Long.parseLong(user.getId()+""), user.getEmail(), user.getPassword()));
    }
}