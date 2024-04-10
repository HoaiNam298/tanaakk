package kodlama.io.hrms.service;


import kodlama.io.hrms.entities.abstracts.RefreshToken;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public interface RefreshTokenService {
    RefreshToken createRefreshToken(String username);
    Optional<RefreshToken> findByToken(String token);
    RefreshToken verifyExpiration(RefreshToken token);
}
