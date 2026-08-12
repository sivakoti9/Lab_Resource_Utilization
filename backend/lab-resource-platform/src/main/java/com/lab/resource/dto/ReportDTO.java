package com.lab.resource.dto;

public class ReportDTO {

    private String equipmentName;
    private int totalQuantity;
    private long bookedQuantity;
    private int availableQuantity;
    private double utilizationPercentage;
    private double totalMaintenanceCost;

    public ReportDTO() {
    }

    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public long getBookedQuantity() {
        return bookedQuantity;
    }

    public void setBookedQuantity(long bookedQuantity) {
        this.bookedQuantity = bookedQuantity;
    }

    public int getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(int availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public double getUtilizationPercentage() {
        return utilizationPercentage;
    }

    public void setUtilizationPercentage(double utilizationPercentage) {
        this.utilizationPercentage = utilizationPercentage;
    }

    public double getTotalMaintenanceCost() {
        return totalMaintenanceCost;
    }

    public void setTotalMaintenanceCost(double totalMaintenanceCost) {
        this.totalMaintenanceCost = totalMaintenanceCost;
    }
}