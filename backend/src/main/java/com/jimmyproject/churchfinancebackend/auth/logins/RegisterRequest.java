package com.jimmyproject.churchfinancebackend.auth.logins;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest{
    @NotBlank
    private String firstName;
    private String lastName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}