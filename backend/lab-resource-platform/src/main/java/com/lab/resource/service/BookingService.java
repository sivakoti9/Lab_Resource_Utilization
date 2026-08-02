package com.lab.resource.service;

import com.lab.resource.entity.Booking;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    // =====================================================
    // BOOKING CRUD
    // =====================================================

    Booking createBooking(Booking booking);

    List<Booking> getAllBookings();

    Booking getBookingById(Long id);

    Booking updateBooking(Long id, Booking booking);

    void deleteBooking(Long id);

    // =====================================================
    // BOOKING WORKFLOW
    // =====================================================

    Booking returnEquipment(Long bookingId);

    List<Booking> getWaitingQueue(Long equipmentId);

    Booking approveBooking(Long bookingId);

    Booking rejectBooking(Long bookingId);

    // =====================================================
    // DASHBOARD STATISTICS
    // =====================================================

    long getTotalBookings();

    long getBookedCount();

    long getReturnedCount();

    long getWaitingCount();

    long getActiveBookings();

    long getTodayBookings();

    long getTodayReturns();

    // =====================================================
    // REPORTS
    // =====================================================

    List<Booking> getBookingsByStatus(String status);

    List<Booking> getActiveBookingList();

    List<Booking> getAllBookingsNewestFirst();

    List<Booking> getBookingsBetweenDates(
            LocalDate startDate,
            LocalDate endDate
    );

    List<Booking> getReturnsBetweenDates(
            LocalDate startDate,
            LocalDate endDate
    );

}