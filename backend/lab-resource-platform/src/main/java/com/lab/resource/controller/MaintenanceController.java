package com.lab.resource.controller;

import com.lab.resource.entity.Maintenance;
import com.lab.resource.service.MaintenanceService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
@CrossOrigin(origins = "http://localhost:5173")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    public MaintenanceController(
            MaintenanceService maintenanceService) {

        this.maintenanceService = maintenanceService;
    }

    // =====================================================
    // SCHEDULE MAINTENANCE
    // =====================================================

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER','LAB_TECHNICIAN')")
    public Maintenance scheduleMaintenance(
            @RequestBody Maintenance maintenance) {

        return maintenanceService.scheduleMaintenance(maintenance);

    }

    // =====================================================
    // GET ALL MAINTENANCE
    // =====================================================

    @GetMapping
    public List<Maintenance> getAllMaintenance() {

        return maintenanceService.getAllMaintenance();

    }

    // =====================================================
    // GET MAINTENANCE BY ID
    // =====================================================

    @GetMapping("/{id}")
    public Maintenance getMaintenanceById(
            @PathVariable Long id) {

        return maintenanceService.getMaintenanceById(id);

    }

    // =====================================================
    // UPDATE MAINTENANCE
    // =====================================================

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER','LAB_TECHNICIAN')")
    public Maintenance updateMaintenance(

            @PathVariable Long id,
            @RequestBody Maintenance maintenance) {

        return maintenanceService.updateMaintenance(
                id,
                maintenance
        );

    }

    // =====================================================
    // DELETE MAINTENANCE
    // =====================================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER')")
    public String deleteMaintenance(
            @PathVariable Long id) {

        maintenanceService.deleteMaintenance(id);

        return "Maintenance deleted successfully";

    }

    // =====================================================
    // FILTER BY STATUS
    // =====================================================

    @GetMapping("/status/{status}")
    public List<Maintenance> getMaintenanceByStatus(

            @PathVariable String status) {

        return maintenanceService.getMaintenanceByStatus(status);

    }

    // =====================================================
    // MAINTENANCE BETWEEN DATES
    // =====================================================

    @GetMapping("/between")
    public List<Maintenance> getMaintenanceBetweenDates(

            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {

        return maintenanceService.getMaintenanceBetweenDates(
                startDate,
                endDate
        );

    }

    // =====================================================
    // UPCOMING MAINTENANCE
    // =====================================================

    @GetMapping("/upcoming")
    public List<Maintenance> getUpcomingMaintenance() {

        return maintenanceService.getUpcomingMaintenance();

    }

}