package com.lab.resource.controller;

import com.lab.resource.dto.ReportDTO;
import com.lab.resource.service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final ReportService reportService;

    public ReportController(
            ReportService reportService) {

        this.reportService = reportService;

    }

    // =====================================================
    // UTILIZATION & COST ANALYSIS REPORT
    // =====================================================

    @GetMapping
    public List<ReportDTO> getUtilizationAndCostReport() {

        return reportService.getUtilizationAndCostReport();

    }

}