package com.jimmyproject.churchfinancebackend.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber = "";
    private String address;
    private boolean active;
}
