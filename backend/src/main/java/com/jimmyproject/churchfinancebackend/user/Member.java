package com.jimmyproject.churchfinancebackend.user;


import com.jimmyproject.churchfinancebackend.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "members")
public class Member extends BaseEntity {
    private String firstName;
    private String lastName;
    private String email = "";
    private String phoneNumber = "";
    private String address = "";
    private Boolean active = true;
}
