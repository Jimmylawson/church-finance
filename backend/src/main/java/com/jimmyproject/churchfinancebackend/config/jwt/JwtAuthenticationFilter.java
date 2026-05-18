package com.jimmyproject.churchfinancebackend.config.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@RequiredArgsConstructor
@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;
    private final JwtTokenProvider jwtTokenProvider;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String jwt = extractToken(request);
            if(jwt != null && SecurityContextHolder.getContext().getAuthentication()  == null){
                String username = jwtTokenProvider.extractUsername(jwt);
                var userDetails = userDetailsService.loadUserByUsername(username);

                if(jwtTokenProvider.isTokenValid(jwt,userDetails)){
                    UsernamePasswordAuthenticationToken auth = new
                            UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    log.debug("Authenticated user={}",username);
                }
            }
            filterChain.doFilter(request,response);

        }catch(ExpiredJwtException ex){
            handleJwtError(response, "Token has expired.");

        }catch(JwtException ex){
            handleJwtError(response, "Invalid JWT token.");
        }catch(Exception ex){
            log.error("Unexpected JWT filter  error: {}", ex.getMessage());
            handleJwtError(response, "Authentication error.");
        }

    }

    private String extractToken(HttpServletRequest request) {
        String header  = request.getHeader("Authorization");

        if(header !=null && header.startsWith("Bearer ")){
            return header.substring(7);
        }
        return null;
    }

    private void handleJwtError(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\":\"" + message + "\"}");

    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();

        return path.equals("/v1/api/auth/login")
                || path.equals("/v1/api/auth/register")
                || path.equals("/v1/api/auth/refresh-token")
                || path.equals("/v1/api/auth/logout")
                || path.startsWith("/oauth2/")
                || path.startsWith("/login/oauth2/");
    }
}