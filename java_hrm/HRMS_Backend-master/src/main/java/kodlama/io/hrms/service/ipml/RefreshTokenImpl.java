package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.RefreshTokenDao;
import kodlama.io.hrms.Dao.UserDao;
import kodlama.io.hrms.dto.UserDto;
import kodlama.io.hrms.entities.abstracts.RefreshToken;
import kodlama.io.hrms.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
@Component
public class RefreshTokenImpl implements RefreshTokenService {
    @Autowired
    private RefreshTokenDao refreshTokenRepository;
    @Autowired
    private UserDao userInfoRepository;
    @Value("${jwt.lifetime-refresh}")
    private int time;

    public RefreshToken createRefreshToken(String username) {
        RefreshToken refreshToken = new RefreshToken(UUID.randomUUID().toString(),Instant.now().plusMillis(time),userInfoRepository.findByEmail(username).get());
        return refreshTokenRepository.save(refreshToken);
    }


    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }


    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException(token.getToken() + " Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

}
