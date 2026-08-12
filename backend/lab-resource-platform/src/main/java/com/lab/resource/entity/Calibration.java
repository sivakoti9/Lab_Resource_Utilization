package com.lab.resource.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "calibration")
public class Calibration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calibrationId;

    @ManyToOne
    @JoinColumn(name = "equipment_id", nullable = false)
    private Equipment equipment;

    @Column(nullable = false)
    private LocalDate calibrationDate;

    @Column(nullable = false)
    private LocalDate nextCalibrationDate;

    @Column(nullable = false)
    private String certificateNumber;

    @Column(nullable = false)
    private String performedBy;

    @Column(nullable = false)
    private String status;

    public Calibration() {
    }

    public Long getCalibrationId() {
        return calibrationId;
    }

    public void setCalibrationId(Long calibrationId) {
        this.calibrationId = calibrationId;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    public LocalDate getCalibrationDate() {
        return calibrationDate;
    }

    public void setCalibrationDate(LocalDate calibrationDate) {
        this.calibrationDate = calibrationDate;
    }

    public LocalDate getNextCalibrationDate() {
        return nextCalibrationDate;
    }

    public void setNextCalibrationDate(LocalDate nextCalibrationDate) {
        this.nextCalibrationDate = nextCalibrationDate;
    }

    public String getCertificateNumber() {
        return certificateNumber;
    }

    public void setCertificateNumber(String certificateNumber) {
        this.certificateNumber = certificateNumber;
    }

    public String getPerformedBy() {
        return performedBy;
    }

    public void setPerformedBy(String performedBy) {
        this.performedBy = performedBy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}