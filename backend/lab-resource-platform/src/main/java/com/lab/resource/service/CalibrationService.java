package com.lab.resource.service;

import com.lab.resource.entity.Calibration;

import java.time.LocalDate;
import java.util.List;

public interface CalibrationService {

    // =====================================================
    // CALIBRATION CRUD
    // =====================================================

    Calibration saveCalibration(Calibration calibration);

    List<Calibration> getAllCalibrations();

    Calibration getCalibrationById(Long id);

    Calibration updateCalibration(Long id, Calibration calibration);

    void deleteCalibration(Long id);

    // =====================================================
    // FILTERS
    // =====================================================

    List<Calibration> getCalibrationByStatus(String status);

    List<Calibration> getCalibrationBetweenDates(
            LocalDate startDate,
            LocalDate endDate
    );

    List<Calibration> getUpcomingCalibrations();

    // =====================================================
    // CERTIFICATION RENEWAL REMINDERS
    // =====================================================

    List<Calibration> getCalibrationReminders();

}