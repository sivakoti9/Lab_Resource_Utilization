package com.lab.resource.service.impl;

import com.lab.resource.dto.NotificationDTO;
import com.lab.resource.entity.Booking;
import com.lab.resource.entity.Calibration;
import com.lab.resource.entity.Maintenance;
import com.lab.resource.repository.BookingRepository;
import com.lab.resource.repository.CalibrationRepository;
import com.lab.resource.repository.MaintenanceRepository;
import com.lab.resource.service.NotificationService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final BookingRepository bookingRepository;
    private final MaintenanceRepository maintenanceRepository;
    private final CalibrationRepository calibrationRepository;

    public NotificationServiceImpl(
            BookingRepository bookingRepository,
            MaintenanceRepository maintenanceRepository,
            CalibrationRepository calibrationRepository) {

        this.bookingRepository = bookingRepository;
        this.maintenanceRepository = maintenanceRepository;
        this.calibrationRepository = calibrationRepository;
    }

    // =====================================================
    // ALL NOTIFICATIONS
    // =====================================================

    @Override
    public List<NotificationDTO> getNotifications() {

        List<NotificationDTO> notifications = new ArrayList<>();

        LocalDate today = LocalDate.now();

        // =====================================================
        // BOOKING RETURN ALERTS
        // =====================================================

        List<Booking> bookings =
                bookingRepository.findByReturnDateBetween(
                        today.minusYears(10),
                        today
                );

        for (Booking booking : bookings) {

            NotificationDTO dto = new NotificationDTO();

            dto.setType("BOOKING");

            dto.setTitle("Equipment Return Due");

            dto.setMessage(
                    booking.getEquipment().getEquipmentName()
                            + " should be returned."
            );

            dto.setDueDate(
                    booking.getReturnDate()
            );

            notifications.add(dto);
        }

        // =====================================================
        // MAINTENANCE ALERTS
        // =====================================================

        List<Maintenance> maintenanceList =
                maintenanceRepository.findByNextMaintenanceDateLessThanEqual(today);

        for (Maintenance maintenance : maintenanceList) {

            NotificationDTO dto = new NotificationDTO();

            dto.setType("MAINTENANCE");

            dto.setTitle("Maintenance Due");

            dto.setMessage(
                    maintenance.getEquipment().getEquipmentName()
                            + " requires maintenance."
            );

            dto.setDueDate(
                    maintenance.getNextMaintenanceDate()
            );

            notifications.add(dto);
        }

        // =====================================================
        // CALIBRATION ALERTS
        // =====================================================

        List<Calibration> calibrationList =
                calibrationRepository.findByNextCalibrationDateLessThanEqual(today);

        for (Calibration calibration : calibrationList) {

            NotificationDTO dto = new NotificationDTO();

            dto.setType("CALIBRATION");

            dto.setTitle("Calibration Due");

            dto.setMessage(
                    calibration.getEquipment().getEquipmentName()
                            + " requires calibration."
            );

            dto.setDueDate(
                    calibration.getNextCalibrationDate()
            );

            notifications.add(dto);
        }

        return notifications;
    }

}