package com.lab.resource.controller;

import com.lab.resource.dto.DashboardStats;
import com.lab.resource.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;

    }

    // =====================================================
    // DASHBOARD STATISTICS
    // =====================================================

    @GetMapping
    public DashboardStats getDashboardStats() {

        return dashboardService.getDashboardStats();

    }

}