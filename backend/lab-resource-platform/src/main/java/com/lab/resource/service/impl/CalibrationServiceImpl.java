package com.lab.resource.service.impl;

import com.lab.resource.entity.Calibration;
import com.lab.resource.repository.CalibrationRepository;
import com.lab.resource.service.CalibrationService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CalibrationServiceImpl implements CalibrationService {

    private final CalibrationRepository calibrationRepository;

    public CalibrationServiceImpl(
            CalibrationRepository calibrationRepository) {

        this.calibrationRepository = calibrationRepository;
    }

    // =====================================================
    // SAVE CALIBRATION
    // =====================================================

    @Override
    public Calibration saveCalibration(Calibration calibration) {

        if (calibration.getStatus() == null ||
                calibration.getStatus().isBlank()) {

            calibration.setStatus("VALID");

        }

        return calibrationRepository.save(calibration);

    }

    // =====================================================
    // GET ALL CALIBRATIONS
    // =====================================================

    @Override
    public List<Calibration> getAllCalibrations() {

        return calibrationRepository.findAll();

    }

    // =====================================================
    // GET CALIBRATION BY ID
    // =====================================================

    @Override
    public Calibration getCalibrationById(Long id) {

        return calibrationRepository.findById(id)
                .orElse(null);

    }

    // =====================================================
    // UPDATE CALIBRATION
    // =====================================================

    @Override
    public Calibration updateCalibration(
            Long id,
            Calibration calibration) {

        Calibration existing = calibrationRepository
                .findById(id)
                .orElse(null);

        if (existing == null) {

            return null;

        }

        existing.setEquipment(calibration.getEquipment());
        existing.setCalibrationDate(calibration.getCalibrationDate());
        existing.setNextCalibrationDate(calibration.getNextCalibrationDate());
        existing.setCertificateNumber(calibration.getCertificateNumber());
        existing.setPerformedBy(calibration.getPerformedBy());
        existing.setStatus(calibration.getStatus());

        return calibrationRepository.save(existing);

    }

    // =====================================================
    // DELETE CALIBRATION
    // =====================================================

    @Override
    public void deleteCalibration(Long id) {

        calibrationRepository.deleteById(id);

    }

    // =====================================================
    // FILTER BY STATUS
    // =====================================================

    @Override
    public List<Calibration> getCalibrationByStatus(String status) {

        return calibrationRepository.findByStatus(status);

    }

    // =====================================================
    // FILTER BY DATE
    // =====================================================

    @Override
    public List<Calibration> getCalibrationBetweenDates(
            LocalDate startDate,
            LocalDate endDate) {

        return calibrationRepository.findByCalibrationDateBetween(
                startDate,
                endDate
        );

    }

    // =====================================================
    // UPCOMING CALIBRATIONS
    // =====================================================

    @Override
    public List<Calibration> getUpcomingCalibrations() {

        return calibrationRepository.findAllByOrderByNextCalibrationDateAsc();

    }

    // =====================================================
    // CERTIFICATION RENEWAL REMINDERS
    // =====================================================

    @Override
    public List<Calibration> getCalibrationReminders() {

        return calibrationRepository.findByNextCalibrationDateLessThanEqual(
                LocalDate.now()
        );

    }

}