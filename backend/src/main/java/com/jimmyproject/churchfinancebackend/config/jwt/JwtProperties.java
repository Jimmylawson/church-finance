package com.jimmyproject.churchfinancebackend.config.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.jwt")
@Getter
@Setter
public class JwtProperties {
    private String secretKey;
    private long accessExpiration;
    private long refreshExpiration;
    private String issuer;
}