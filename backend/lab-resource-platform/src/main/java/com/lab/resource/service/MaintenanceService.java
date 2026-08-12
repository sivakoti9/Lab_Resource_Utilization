package com.lab.resource.service;

import com.lab.resource.entity.Maintenance;

import java.time.LocalDate;
import java.util.List;

public interface MaintenanceService {

    // =====================================================
    // MAINTENANCE CRUD
    // =====================================================

    Maintenance scheduleMaintenance(Maintenance maintenance);

    List<Maintenance> getAllMaintenance();

    Maintenance getMaintenanceById(Long id);

    Maintenance updateMaintenance(Long id, Maintenance maintenance);

    void deleteMaintenance(Long id);

    // =====================================================
    // FILTERS
    // =====================================================

    List<Maintenance> getMaintenanceByStatus(String status);

    List<Maintenance> getMaintenanceBetweenDates(
            LocalDate startDate,
            LocalDate endDate
    );

    List<Maintenance> getUpcomingMaintenance();

}