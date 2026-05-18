package com.jimmyproject.churchfinancebackend.auth.logins;


import com.jimmyproject.churchfinancebackend.user.UserResponse;
import lombok.*;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class LoginResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private long expiresIn;
    private Instant expiresAt;
    private UserResponse user;
}