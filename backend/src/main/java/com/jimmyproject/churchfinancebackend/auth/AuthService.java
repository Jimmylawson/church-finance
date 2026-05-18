package com.jimmyproject.churchfinancebackend.auth;


import com.jimmyproject.churchfinancebackend.auth.logins.LoginRequest;
import com.jimmyproject.churchfinancebackend.auth.logins.LoginResponse;
import com.jimmyproject.churchfinancebackend.auth.logins.RegisterRequest;
import com.jimmyproject.churchfinancebackend.config.CustomUserDetailsService;
import com.jimmyproject.churchfinancebackend.config.CustomerUserDetail;
import com.jimmyproject.churchfinancebackend.config.jwt.JwtProperties;
import com.jimmyproject.churchfinancebackend.config.jwt.JwtTokenProvider;
import com.jimmyproject.churchfinancebackend.enums.ROLE;
import com.jimmyproject.churchfinancebackend.user.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailService;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtProperties jwtProperties;
    private final UserMapper userMapper;

    public LoginResponse login(LoginRequest dto){
        //AUthenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()
                ));

        //Generate token
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if(user.getPassword() == null || !passwordEncoder.matches(dto.getPassword(), user.getPassword())){
            throw new BadCredentialsException("Invalid credentials");
        }


        return generateToken(user);

    }

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

    public Long getCurrentUserId(){
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth == null || !(auth.getPrincipal() instanceof CustomerUserDetail userDetails)){
            throw new AccessDeniedException("User is not authenticated");
        }
        return userDetails.getUserId();
    }

    public UserResponse getCurrentUser(){
        Long userId = getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        return userMapper.toResponse(user);
    }


    @Transactional
    public LoginResponse register(RegisterRequest dto){
        if(userRepository.existsByEmail(dto.getEmail())){
            throw new UserAlreadyExistException("Email already taken");
        }

        var user = User.newUser(
                dto.getFirstName(),
                dto.getLastName(),
                dto.getEmail(),
                passwordEncoder.encode(dto.getPassword()),
                ROLE.ROLE_USER
        );

        var savedUser =  userRepository.save(user);

        return generateToken(savedUser);
    }

    public LoginResponse refreshToken(String refreshToken) {
        if (!jwtTokenProvider.isRefreshToken(refreshToken)) {
            throw new BadCredentialsException("Invalid refresh token");
        }

        String email = jwtTokenProvider.extractUsername(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return generateToken(user);
    }
}