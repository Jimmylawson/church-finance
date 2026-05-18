package com.jimmyproject.churchfinancebackend.auth;

import com.jimmyproject.churchfinancebackend.auth.logins.LoginRequest;
import com.jimmyproject.churchfinancebackend.auth.logins.LoginResponse;
import com.jimmyproject.churchfinancebackend.auth.logins.RegisterRequest;
import com.jimmyproject.churchfinancebackend.user.UserRepository;
import com.jimmyproject.churchfinancebackend.user.UserResponse;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/v1/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> UserLogin(@Valid @RequestBody LoginRequest dto, HttpServletResponse response){
        LoginResponse loginResponse = authService.login(dto);
        addRefreshTokenCookie(response, loginResponse.getRefreshToken());
        hideRefreshToken(loginResponse);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> UserRegister(@Valid @RequestBody RegisterRequest dto, HttpServletResponse response){
        LoginResponse loginResponse = authService.register(dto);
        addRefreshTokenCookie(response, loginResponse.getRefreshToken());
        hideRefreshToken(loginResponse);
        return ResponseEntity.status(HttpStatus.CREATED).body(loginResponse);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<LoginResponse> refreshToken(@CookieValue("refresh_token") String refreshToken, HttpServletResponse response) {
        LoginResponse loginResponse = authService.refreshToken(refreshToken);
        addRefreshTokenCookie(response, loginResponse.getRefreshToken());
        hideRefreshToken(loginResponse);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response){
        clearRefreshTokenCookie(response);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {

        return ResponseEntity.ok(authService.getCurrentUser());
    }

    private void addRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/v1/api/auth/refresh-token")
                .maxAge(Duration.ofDays(7))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private void clearRefreshTokenCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("refresh_token", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/v1/api/auth/refresh-token")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private void hideRefreshToken(LoginResponse loginResponse) {
        loginResponse.setRefreshToken(null);
    }
}