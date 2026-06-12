package com.jimmyproject.churchfinancebackend.auth;

import com.jimmyproject.churchfinancebackend.auth.logins.LoginResponse;
import com.jimmyproject.churchfinancebackend.config.CustomUserDetailsService;
import com.jimmyproject.churchfinancebackend.config.CustomerUserDetail;
import com.jimmyproject.churchfinancebackend.config.jwt.JwtProperties;
import com.jimmyproject.churchfinancebackend.config.jwt.JwtTokenProvider;
import com.jimmyproject.churchfinancebackend.user.User;
import com.jimmyproject.churchfinancebackend.user.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthTokenService {
    private final CustomUserDetailsService customUserDetailService;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtProperties jwtProperties;
    private final UserMapper userMapper;

    public LoginResponse generateToken(User user) {
        var userDetails = (UserDetails) customUserDetailService.loadUserByUsername(user.getEmail());
        String accessToken = jwtTokenProvider.generateAccessToken(userDetails);
        String refreshToken = jwtTokenProvider.generateRefreshToken(userDetails);
        CustomerUserDetail principal = (CustomerUserDetail) userDetails;

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtProperties.getAccessExpiration())
                .expiresAt(jwtTokenProvider.getExpirationDateFromToken(accessToken))
                .user(userMapper.toResponse(principal.getUser()))
                .build();
    }
}
