package com.jimmyproject.churchfinancebackend.user;

import com.jimmyproject.churchfinancebackend.exceptions.ResourceNotFoundException;

public class UserNotFoundException extends ResourceNotFoundException {

    public UserNotFoundException(Long id) {
        super("User not found with id: " + id);
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
