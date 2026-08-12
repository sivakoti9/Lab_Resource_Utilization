package com.lab.resource.service.impl;

import com.lab.resource.entity.Maintenance;
import com.lab.resource.repository.MaintenanceRepository;
import com.lab.resource.service.MaintenanceService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MaintenanceServiceImpl implements MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;

    public MaintenanceServiceImpl(
            MaintenanceRepository maintenanceRepository) {

        this.maintenanceRepository = maintenanceRepository;
    }

    // =====================================================
    // SCHEDULE MAINTENANCE
    // =====================================================

    @Override
    public Maintenance scheduleMaintenance(Maintenance maintenance) {

        if (maintenance.getStatus() == null ||
                maintenance.getStatus().isBlank()) {

            maintenance.setStatus("SCHEDULED");

        }

        return maintenanceRepository.save(maintenance);

    }

    // =====================================================
    // GET ALL MAINTENANCE
    // =====================================================

    @Override
    public List<Maintenance> getAllMaintenance() {

        return maintenanceRepository.findAll();

    }

    // =====================================================
    // GET MAINTENANCE BY ID
    // =====================================================

    @Override
    public Maintenance getMaintenanceById(Long id) {

        return maintenanceRepository.findById(id)
                .orElse(null);

    }

    // =====================================================
    // UPDATE MAINTENANCE
    // =====================================================

    @Override
    public Maintenance updateMaintenance(
            Long id,
            Maintenance maintenance) {

        Maintenance existing =
                maintenanceRepository.findById(id)
                        .orElse(null);

        if (existing == null) {

            return null;

        }

        existing.setEquipment(maintenance.getEquipment());
        existing.setMaintenanceDate(maintenance.getMaintenanceDate());
        existing.setCompletionDate(maintenance.getCompletionDate());
        existing.setDescription(maintenance.getDescription());
        existing.setTechnician(maintenance.getTechnician());
        existing.setStatus(maintenance.getStatus());

        return maintenanceRepository.save(existing);

    }

    // =====================================================
    // DELETE MAINTENANCE
    // =====================================================

    @Override
    public void deleteMaintenance(Long id) {

        maintenanceRepository.deleteById(id);

    }

    // =====================================================
    // FILTER BY STATUS
    // =====================================================

    @Override
    public List<Maintenance> getMaintenanceByStatus(String status) {

        return maintenanceRepository.findByStatus(status);

    }

    // =====================================================
    // FILTER BY DATE
    // =====================================================

    @Override
    public List<Maintenance> getMaintenanceBetweenDates(
            LocalDate startDate,
            LocalDate endDate) {

        return maintenanceRepository.findByMaintenanceDateBetween(
                startDate,
                endDate
        );

    }

    // =====================================================
    // UPCOMING MAINTENANCE
    // =====================================================

    @Override
    public List<Maintenance> getUpcomingMaintenance() {

        return maintenanceRepository.findAllByOrderByMaintenanceDateAsc();

    }

}