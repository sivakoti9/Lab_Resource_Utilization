package com.lab.resource.repository;

import com.lab.resource.entity.CostTracking;
import com.lab.resource.entity.Equipment;
import com.lab.resource.entity.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CostTrackingRepository extends JpaRepository<CostTracking, Long> {

    // =====================================================
    // FILTER BY EQUIPMENT
    // =====================================================

    List<CostTracking> findByEquipment(Equipment equipment);

    // =====================================================
    // FILTER BY MAINTENANCE
    // =====================================================

    List<CostTracking> findByMaintenance(Maintenance maintenance);

    // =====================================================
    // FILTER BY COST TYPE
    // =====================================================

    List<CostTracking> findByCostType(String costType);

    // =====================================================
    // FILTER BY EXPENSE DATE
    // =====================================================

    List<CostTracking> findByExpenseDate(LocalDate expenseDate);

    List<CostTracking> findByExpenseDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    // =====================================================
    // DASHBOARD / REPORTS
    // =====================================================

    List<CostTracking> findAllByOrderByExpenseDateDesc();

}