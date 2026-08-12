package com.lab.resource.controller;

import com.lab.resource.entity.CostTracking;
import com.lab.resource.service.CostTrackingService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/costs")
@CrossOrigin(origins = "http://localhost:5173")
public class CostTrackingController {

    private final CostTrackingService costTrackingService;

    public CostTrackingController(
            CostTrackingService costTrackingService) {

        this.costTrackingService = costTrackingService;
    }

    // =====================================================
    // CREATE COST
    // =====================================================

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER')")
    public CostTracking saveCost(
            @RequestBody CostTracking costTracking) {

        return costTrackingService.saveCost(costTracking);

    }

    // =====================================================
    // GET ALL COSTS
    // =====================================================

    @GetMapping
    public List<CostTracking> getAllCosts() {

        return costTrackingService.getAllCosts();

    }

    // =====================================================
    // GET COST BY ID
    // =====================================================

    @GetMapping("/{id}")
    public CostTracking getCostById(
            @PathVariable Long id) {

        return costTrackingService.getCostById(id);

    }

    // =====================================================
    // UPDATE COST
    // =====================================================

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER')")
    public CostTracking updateCost(

            @PathVariable Long id,
            @RequestBody CostTracking costTracking) {

        return costTrackingService.updateCost(
                id,
                costTracking
        );

    }

    // =====================================================
    // DELETE COST
    // =====================================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteCost(
            @PathVariable Long id) {

        costTrackingService.deleteCost(id);

        return "Cost record deleted successfully";

    }

    // =====================================================
    // FILTER BY COST TYPE
    // =====================================================

    @GetMapping("/type/{costType}")
    public List<CostTracking> getCostsByCostType(
            @PathVariable String costType) {

        return costTrackingService.getCostsByCostType(costType);

    }

    // =====================================================
    // FILTER BY DATE
    // =====================================================

    @GetMapping("/between")
    public List<CostTracking> getCostsBetweenDates(

            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {

        return costTrackingService.getCostsBetweenDates(
                startDate,
                endDate
        );

    }

    // =====================================================
    // LATEST COSTS
    // =====================================================

    @GetMapping("/latest")
    public List<CostTracking> getLatestCosts() {

        return costTrackingService.getLatestCosts();

    }

}