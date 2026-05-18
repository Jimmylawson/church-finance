package com.jimmyproject.churchfinancebackend.user;

import com.jimmyproject.churchfinancebackend.exceptions.ResourceNotFoundException;

public class UserAlreadyExistException extends ResourceNotFoundException {

    public UserAlreadyExistException(String message) {
        super(message);
    }
}
