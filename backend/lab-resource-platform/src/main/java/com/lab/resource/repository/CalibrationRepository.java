package com.lab.resource.repository;

import com.lab.resource.entity.Calibration;
import com.lab.resource.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CalibrationRepository extends JpaRepository<Calibration, Long> {

    // =====================================================
    // FILTER BY EQUIPMENT
    // =====================================================

    List<Calibration> findByEquipment(Equipment equipment);

    // =====================================================
    // FILTER BY STATUS
    // =====================================================

    List<Calibration> findByStatus(String status);

    // =====================================================
    // FILTER BY CALIBRATION DATE
    // =====================================================

    List<Calibration> findByCalibrationDate(LocalDate calibrationDate);

    List<Calibration> findByCalibrationDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    // =====================================================
    // FILTER BY NEXT CALIBRATION DATE
    // =====================================================

    List<Calibration> findByNextCalibrationDate(LocalDate nextCalibrationDate);

    List<Calibration> findByNextCalibrationDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    // =====================================================
    // UPCOMING CALIBRATIONS
    // =====================================================

    List<Calibration> findAllByOrderByNextCalibrationDateAsc();

    // =====================================================
// CERTIFICATION RENEWAL REMINDERS
// =====================================================

    List<Calibration> findByNextCalibrationDateLessThanEqual(
            LocalDate date
    );

    List<Calibration> findByNextCalibrationDateBefore(
            LocalDate date
    );

}