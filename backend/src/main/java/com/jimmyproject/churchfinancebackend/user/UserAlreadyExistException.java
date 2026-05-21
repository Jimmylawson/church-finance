package com.jimmyproject.churchfinancebackend.user;

import com.jimmyproject.churchfinancebackend.exceptions.ResourceNotFoundException;

public class UserAlreadyExistException extends RuntimeException {

    public UserAlreadyExistException(String message) {

        super(message);
    }
}
