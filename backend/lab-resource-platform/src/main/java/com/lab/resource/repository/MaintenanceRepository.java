package com.lab.resource.repository;

import com.lab.resource.entity.Equipment;
import com.lab.resource.entity.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {

    // =====================================================
    // FILTER BY EQUIPMENT
    // =====================================================

    List<Maintenance> findByEquipment(Equipment equipment);
    List<Maintenance> findByNextMaintenanceDateLessThanEqual(LocalDate date);
    // =====================================================
    // FILTER BY STATUS
    // =====================================================

    List<Maintenance> findByStatus(String status);

    // =====================================================
    // FILTER BY DATE
    // =====================================================

    List<Maintenance> findByMaintenanceDate(LocalDate maintenanceDate);

    List<Maintenance> findByMaintenanceDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    // =====================================================
    // UPCOMING MAINTENANCE
    // =====================================================

    List<Maintenance> findAllByOrderByMaintenanceDateAsc();

}