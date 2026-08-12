package com.lab.resource.dto;

public class DashboardStats {

    private long totalUsers;
    private long totalEquipment;
    private long totalBookings;
    private long activeBookings;
    private long totalMaintenance;
    private long totalCalibrations;
    private long totalCosts;

    public DashboardStats() {
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalEquipment() {
        return totalEquipment;
    }

    public void setTotalEquipment(long totalEquipment) {
        this.totalEquipment = totalEquipment;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public long getActiveBookings() {
        return activeBookings;
    }

    public void setActiveBookings(long activeBookings) {
        this.activeBookings = activeBookings;
    }

    public long getTotalMaintenance() {
        return totalMaintenance;
    }

    public void setTotalMaintenance(long totalMaintenance) {
        this.totalMaintenance = totalMaintenance;
    }

    public long getTotalCalibrations() {
        return totalCalibrations;
    }

    public void setTotalCalibrations(long totalCalibrations) {
        this.totalCalibrations = totalCalibrations;
    }

    public long getTotalCosts() {
        return totalCosts;
    }

    public void setTotalCosts(long totalCosts) {
        this.totalCosts = totalCosts;
    }
}