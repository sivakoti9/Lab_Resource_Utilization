package com.lab.resource.service.impl;

import com.lab.resource.dto.DashboardStats;
import com.lab.resource.repository.BookingRepository;
import com.lab.resource.repository.CalibrationRepository;
import com.lab.resource.repository.CostTrackingRepository;
import com.lab.resource.repository.EquipmentRepository;
import com.lab.resource.repository.MaintenanceRepository;
import com.lab.resource.repository.UserRepository;
import com.lab.resource.service.DashboardService;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final EquipmentRepository equipmentRepository;
    private final BookingRepository bookingRepository;
    private final MaintenanceRepository maintenanceRepository;
    private final CalibrationRepository calibrationRepository;
    private final CostTrackingRepository costTrackingRepository;

    public DashboardServiceImpl(
            UserRepository userRepository,
            EquipmentRepository equipmentRepository,
            BookingRepository bookingRepository,
            MaintenanceRepository maintenanceRepository,
            CalibrationRepository calibrationRepository,
            CostTrackingRepository costTrackingRepository) {

        this.userRepository = userRepository;
        this.equipmentRepository = equipmentRepository;
        this.bookingRepository = bookingRepository;
        this.maintenanceRepository = maintenanceRepository;
        this.calibrationRepository = calibrationRepository;
        this.costTrackingRepository = costTrackingRepository;
    }

    // =====================================================
    // DASHBOARD STATISTICS
    // =====================================================

    @Override
    public DashboardStats getDashboardStats() {

        DashboardStats stats = new DashboardStats();

        stats.setTotalUsers(
                userRepository.count()
        );

        stats.setTotalEquipment(
                equipmentRepository.count()
        );

        stats.setTotalBookings(
                bookingRepository.count()
        );

        stats.setActiveBookings(
                bookingRepository.countByActive(true)
        );

        stats.setTotalMaintenance(
                maintenanceRepository.count()
        );

        stats.setTotalCalibrations(
                calibrationRepository.count()
        );

        stats.setTotalCosts(
                costTrackingRepository.count()
        );

        return stats;
    }

}