package com.lab.resource.controller;

import com.lab.resource.entity.Calibration;
import com.lab.resource.service.CalibrationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/calibrations")
@CrossOrigin(origins = "http://localhost:5173")
public class CalibrationController {

    private final CalibrationService calibrationService;

    public CalibrationController(
            CalibrationService calibrationService) {

        this.calibrationService = calibrationService;
    }

    // =====================================================
    // CREATE CALIBRATION
    // =====================================================

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER','LAB_TECHNICIAN')")
    public Calibration saveCalibration(
            @RequestBody Calibration calibration) {

        return calibrationService.saveCalibration(calibration);

    }

    // =====================================================
    // GET ALL CALIBRATIONS
    // =====================================================

    @GetMapping
    public List<Calibration> getAllCalibrations() {

        return calibrationService.getAllCalibrations();

    }

    // =====================================================
    // GET CALIBRATION BY ID
    // =====================================================

    @GetMapping("/{id}")
    public Calibration getCalibrationById(
            @PathVariable Long id) {

        return calibrationService.getCalibrationById(id);

    }

    // =====================================================
    // UPDATE CALIBRATION
    // =====================================================

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER','LAB_TECHNICIAN')")
    public Calibration updateCalibration(

            @PathVariable Long id,
            @RequestBody Calibration calibration) {

        return calibrationService.updateCalibration(
                id,
                calibration
        );

    }

    // =====================================================
    // DELETE CALIBRATION
    // =====================================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER')")
    public String deleteCalibration(
            @PathVariable Long id) {

        calibrationService.deleteCalibration(id);

        return "Calibration deleted successfully";

    }

    // =====================================================
    // FILTER BY STATUS
    // =====================================================

    @GetMapping("/status/{status}")
    public List<Calibration> getCalibrationByStatus(
            @PathVariable String status) {

        return calibrationService.getCalibrationByStatus(status);

    }

    // =====================================================
    // FILTER BY DATE
    // =====================================================

    @GetMapping("/between")
    public List<Calibration> getCalibrationBetweenDates(

            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {

        return calibrationService.getCalibrationBetweenDates(
                startDate,
                endDate
        );

    }

    // =====================================================
    // UPCOMING CALIBRATIONS
    // =====================================================

    @GetMapping("/upcoming")
    public List<Calibration> getUpcomingCalibrations() {

        return calibrationService.getUpcomingCalibrations();

    }

    // =====================================================
    // CERTIFICATION RENEWAL REMINDERS
    // =====================================================

    @GetMapping("/reminders")
    public List<Calibration> getCalibrationReminders() {

        return calibrationService.getCalibrationReminders();

    }

}