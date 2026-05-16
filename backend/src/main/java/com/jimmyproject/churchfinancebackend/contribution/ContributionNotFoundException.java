package com.jimmyproject.churchfinancebackend.contribution;

import com.jimmyproject.churchfinancebackend.exceptions.ResourceNotFoundException;

public class ContributionNotFoundException extends ResourceNotFoundException {

    public ContributionNotFoundException(Long id) {
        super("Contribution not found with id: " + id);
    }

    public ContributionNotFoundException(String message) {
        super(message);
    }
}
