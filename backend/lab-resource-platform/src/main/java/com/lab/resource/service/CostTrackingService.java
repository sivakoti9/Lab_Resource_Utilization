package com.lab.resource.service;

import com.lab.resource.entity.CostTracking;

import java.time.LocalDate;
import java.util.List;

public interface CostTrackingService {

    // =====================================================
    // COST TRACKING CRUD
    // =====================================================

    CostTracking saveCost(CostTracking costTracking);

    List<CostTracking> getAllCosts();

    CostTracking getCostById(Long id);

    CostTracking updateCost(Long id, CostTracking costTracking);

    void deleteCost(Long id);

    // =====================================================
    // FILTERS
    // =====================================================

    List<CostTracking> getCostsByCostType(String costType);

    List<CostTracking> getCostsBetweenDates(
            LocalDate startDate,
            LocalDate endDate
    );

    List<CostTracking> getLatestCosts();

}