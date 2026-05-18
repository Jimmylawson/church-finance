package com.jimmyproject.churchfinancebackend.user;

import com.jimmyproject.churchfinancebackend.base.BaseEntity;
import com.jimmyproject.churchfinancebackend.enums.ROLE;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;

import java.security.AuthProvider;

@Entity
@Table(name="users")
@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor

public class User extends BaseEntity {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private boolean enabled = true;
    @Enumerated(EnumType.STRING)
    private ROLE role = ROLE.ROLE_ADMIN;

    public static  User newUser(String firstName, String lastName, String email, String passwordHash, ROLE role) {
        return new User(firstName, lastName, email, passwordHash,true, role);
    }


}
