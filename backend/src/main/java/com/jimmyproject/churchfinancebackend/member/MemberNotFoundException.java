package com.jimmyproject.churchfinancebackend.member;

import com.jimmyproject.churchfinancebackend.exceptions.ResourceNotFoundException;

public class MemberNotFoundException extends ResourceNotFoundException {

    public MemberNotFoundException(Long id) {
        super("Member not found with id: " + id);
    }

    public MemberNotFoundException(String message) {
        super(message);
    }
}
