package com.lab.resource.service;

import com.lab.resource.dto.ReportDTO;

import java.util.List;

public interface ReportService {

    // =====================================================
    // UTILIZATION & COST ANALYSIS REPORT
    // =====================================================

    List<ReportDTO> getUtilizationAndCostReport();

}