package com.lab.resource.service.impl;

import com.lab.resource.entity.CostTracking;
import com.lab.resource.repository.CostTrackingRepository;
import com.lab.resource.service.CostTrackingService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CostTrackingServiceImpl implements CostTrackingService {

    private final CostTrackingRepository costTrackingRepository;

    public CostTrackingServiceImpl(
            CostTrackingRepository costTrackingRepository) {

        this.costTrackingRepository = costTrackingRepository;
    }

    // =====================================================
    // SAVE COST
    // =====================================================

    @Override
    public CostTracking saveCost(CostTracking costTracking) {

        return costTrackingRepository.save(costTracking);

    }

    // =====================================================
    // GET ALL COSTS
    // =====================================================

    @Override
    public List<CostTracking> getAllCosts() {

        return costTrackingRepository.findAll();

    }

    // =====================================================
    // GET COST BY ID
    // =====================================================

    @Override
    public CostTracking getCostById(Long id) {

        return costTrackingRepository.findById(id)
                .orElse(null);

    }

    // =====================================================
    // UPDATE COST
    // =====================================================

    @Override
    public CostTracking updateCost(
            Long id,
            CostTracking costTracking) {

        CostTracking existing = costTrackingRepository
                .findById(id)
                .orElse(null);

        if (existing == null) {

            return null;

        }

        existing.setEquipment(costTracking.getEquipment());
        existing.setMaintenance(costTracking.getMaintenance());
        existing.setCostType(costTracking.getCostType());
        existing.setAmount(costTracking.getAmount());
        existing.setExpenseDate(costTracking.getExpenseDate());
        existing.setDescription(costTracking.getDescription());

        return costTrackingRepository.save(existing);

    }

    // =====================================================
    // DELETE COST
    // =====================================================

    @Override
    public void deleteCost(Long id) {

        costTrackingRepository.deleteById(id);

    }

    // =====================================================
    // FILTER BY COST TYPE
    // =====================================================

    @Override
    public List<CostTracking> getCostsByCostType(String costType) {

        return costTrackingRepository.findByCostType(costType);

    }

    // =====================================================
    // FILTER BY DATE
    // =====================================================

    @Override
    public List<CostTracking> getCostsBetweenDates(
            LocalDate startDate,
            LocalDate endDate) {

        return costTrackingRepository.findByExpenseDateBetween(
                startDate,
                endDate
        );

    }

    // =====================================================
    // LATEST COSTS
    // =====================================================

    @Override
    public List<CostTracking> getLatestCosts() {

        return costTrackingRepository.findAllByOrderByExpenseDateDesc();

    }

}