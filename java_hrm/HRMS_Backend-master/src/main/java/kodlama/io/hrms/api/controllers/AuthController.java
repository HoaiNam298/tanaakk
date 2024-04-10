package kodlama.io.hrms.api.controllers;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import kodlama.io.hrms.config.JwtTokenUtils;
import kodlama.io.hrms.core.utilities.adapters.adapters.concretes.UserDetailService;
import kodlama.io.hrms.core.utilities.results.MError;
import kodlama.io.hrms.dto.JwtRequest;
import kodlama.io.hrms.dto.JwtResponse;
import kodlama.io.hrms.dto.RefreshTokenRequest;
import kodlama.io.hrms.dto.RegistrationUserDto;
import kodlama.io.hrms.entities.abstracts.RefreshToken;
import kodlama.io.hrms.entities.abstracts.User;
import kodlama.io.hrms.service.RefreshTokenService;
import kodlama.io.hrms.service.ipml.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailService service;
    @Autowired
    private AuthService authService;
    @Autowired
    private JwtTokenUtils jw;
    @Value("${jwt.secret}")
    private String secret;
    @Autowired
    private RefreshTokenService refreshTokenService;
    //    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
//        try {
//            String username = credentials.get("username");
//            String password = credentials.get("password");
//
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(username, password)
//            );
//
//            // Nếu xác thực thành công, tạo token JWT và trả về cho người dùng
//            String token = Jwts.builder()
//                    .setSubject(username)
//                    .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // Token hết hạn sau 1 giờ
//                    .signWith(SignatureAlgorithm.HS512, "KEY:dsgdhjgdsfad1325426733243")
//                    .compact();
//            System.out.println(token);
//            return new ResponseEntity<String>(token, HttpStatus.OK);
//        } catch (Exception e) {
//            return ResponseEntity.status(401).body("Đăng nhập không thành công");
//        }
//    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
        try {
            String username = credentials.get("username");
            String password = new BCryptPasswordEncoder().encode(credentials.get("password"));
            Optional<User> user = service.findByUsername(username);
            if (!user.isPresent()) {
                return new ResponseEntity<>("unza u p", HttpStatus.UNAUTHORIZED);
            }

            // Tạo JWT token
            String token = Jwts.builder()
                    .setSubject(username)
                    .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // Token hết hạn sau 1 giờ
                    .signWith(SignatureAlgorithm.HS256, secret)
                    .compact();

            // Trả về token cho người dùng
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("login fail", HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/auth")
    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(),authRequest.getPassword()));
        }catch (BadCredentialsException e){
            return new ResponseEntity<>(new MError(HttpStatus.UNAUTHORIZED.value(),"user or pass is correct"),HttpStatus.UNAUTHORIZED);
        }
        UserDetails userDetails= service.loadUserByUsername(authRequest.getUsername());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(authRequest.getUsername());
        String token= jw.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token,refreshToken.getToken()));
    }

    @PostMapping("/registration")
    public ResponseEntity<?> createNewUser(@RequestBody RegistrationUserDto registrationUserDto) {
        return authService.createNewUser(registrationUserDto);
    }

    @GetMapping("/login-success")
    public ResponseEntity<String> loginSuccess() {
        return new ResponseEntity<>("login success", HttpStatus.OK);
    }
    @PostMapping("/refreshToken")
    public JwtResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return refreshTokenService.findByToken(refreshTokenRequest.getToken())
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUserInfo)
                .map(userInfo -> {
                    UserDetails userDetails= service.loadUserByUsername(userInfo.getEmail());
                    String accessToken = jw.generateToken(userDetails);
                    return JwtResponse.builder()
                            .accessToken(accessToken)
                            .token(refreshTokenRequest.getToken())
                            .build();
                }).orElseThrow(() -> new RuntimeException(
                        "Refresh token is not in database!"));
    }

}

