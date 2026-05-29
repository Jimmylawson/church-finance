package com.jimmyproject.churchfinancebackend.dashboard;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashBoardService dashBoardService;

    @PostMapping
    public ResponseEntity<DashboardResponse> getDashboard(@RequestParam(required = false) Integer year,
                                       @RequestParam(required = false) Integer month,
                                       @RequestParam(required = false) LocalDate startDate,
                                       @RequestParam(required = false) LocalDate endDate) {
        return ResponseEntity.ok(dashBoardService.getDashboard(year, month, startDate, endDate));
    }
}
