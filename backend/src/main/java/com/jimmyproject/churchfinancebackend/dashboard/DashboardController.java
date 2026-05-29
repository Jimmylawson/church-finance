package com.jimmyproject.churchfinancebackend.dashboard;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashBoardService dashBoardService;
}
