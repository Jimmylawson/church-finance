package com.jimmyproject.churchfinancebackend.auth;

import com.jimmyproject.churchfinancebackend.config.jwt.AppProperties;
import com.jimmyproject.churchfinancebackend.enums.ROLE;
import com.jimmyproject.churchfinancebackend.user.User;
import com.jimmyproject.churchfinancebackend.user.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.Duration;


@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final UserRepository userRepository;
    private final AuthTokenService authTokenService;
    private final AppProperties appProperties;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oauth2User = (OAuth2User)authentication.getPrincipal();
        String email = oauth2User.getAttribute("email");
        String firstName = oauth2User.getAttribute("given_name");
        String lastName = oauth2User.getAttribute("family_name");

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> createGoogleUser(email, firstName, lastName));

        var loginResponse = authTokenService.generateToken(user);

        String redirectUrl = UriComponentsBuilder
                .fromUriString(appProperties.getFrontendUrl() + "/oauth/success")
                .queryParam("accessToken", loginResponse.getAccessToken())
                .queryParam("tokenType", loginResponse.getTokenType())
                .queryParam("expiresIn", loginResponse.getExpiresIn())
                .queryParam("expiresAt", loginResponse.getExpiresAt())
                .queryParam("userId", user.getId())
                .queryParam("firstName", user.getFirstName())
                .queryParam("lastName", user.getLastName())
                .queryParam("email", user.getEmail())
                .build()
                .toUriString();

        addRefreshTokenCookie(response, loginResponse.getRefreshToken());
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }

    private void addRefreshTokenCookie(HttpServletResponse response, String refreshToken){

        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/v1/api/auth/refresh-token")
                .maxAge(Duration.ofDays(7))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private User createGoogleUser(String email, String firstName, String lastName) {
        User user = new User();
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEnabled(true);
        user.setRole(ROLE.ROLE_USER);
        return userRepository.save(user);
    }
}
