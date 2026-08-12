package com.lab.resource.controller;

import com.lab.resource.entity.Booking;
import com.lab.resource.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // =====================================================
    // CREATE BOOKING
    // =====================================================

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {

        return bookingService.createBooking(booking);

    }

    // =====================================================
    // GET ALL BOOKINGS
    // =====================================================

    @GetMapping
    public List<Booking> getAllBookings() {

        return bookingService.getAllBookings();

    }

    // =====================================================
    // GET BOOKING BY ID
    // =====================================================

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {

        return bookingService.getBookingById(id);

    }

    // =====================================================
    // UPDATE BOOKING
    // =====================================================

    @PutMapping("/{id}")
    public Booking updateBooking(
            @PathVariable Long id,
            @RequestBody Booking booking) {

        return bookingService.updateBooking(id, booking);

    }

    // =====================================================
    // DELETE BOOKING
    // =====================================================

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {

        bookingService.deleteBooking(id);

    }

    // =====================================================
    // RETURN EQUIPMENT
    // =====================================================

    @PutMapping("/{id}/return")
    public Booking returnEquipment(@PathVariable Long id) {

        return bookingService.returnEquipment(id);

    }

    // =====================================================
    // WAITING QUEUE
    // =====================================================

    @GetMapping("/queue/{equipmentId}")
    public List<Booking> getWaitingQueue(
            @PathVariable Long equipmentId) {

        return bookingService.getWaitingQueue(equipmentId);

    }

    // =====================================================
    // APPROVE BOOKING
    // =====================================================

    @PutMapping("/{id}/approve")
    public Booking approveBooking(@PathVariable Long id) {

        return bookingService.approveBooking(id);

    }

    // =====================================================
    // REJECT BOOKING
    // =====================================================

    @PutMapping("/{id}/reject")
    public Booking rejectBooking(@PathVariable Long id) {

        return bookingService.rejectBooking(id);

    }

    // =====================================================
    // DASHBOARD STATISTICS
    // =====================================================

    @GetMapping("/count")
    public long getTotalBookings() {

        return bookingService.getTotalBookings();

    }

    @GetMapping("/count/booked")
    public long getBookedCount() {

        return bookingService.getBookedCount();

    }

    @GetMapping("/count/returned")
    public long getReturnedCount() {

        return bookingService.getReturnedCount();

    }

    @GetMapping("/count/waiting")
    public long getWaitingCount() {

        return bookingService.getWaitingCount();

    }

    @GetMapping("/count/active")
    public long getActiveBookings() {

        return bookingService.getActiveBookings();

    }
    // =====================================================
// LOGGED-IN USER DASHBOARD STATISTICS
// =====================================================

    @GetMapping("/my/count")
    public long getUserTotalBookings() {

        return bookingService.getUserTotalBookings();

    }

    @GetMapping("/my/count/booked")
    public long getUserBookedCount() {

        return bookingService.getUserBookedCount();

    }

    @GetMapping("/my/count/returned")
    public long getUserReturnedCount() {

        return bookingService.getUserReturnedCount();

    }

    @GetMapping("/my/count/waiting")
    public long getUserWaitingCount() {

        return bookingService.getUserWaitingCount();

    }

    @GetMapping("/my/count/active")
    public long getUserActiveBookings() {

        return bookingService.getUserActiveBookings();

    }

    // =====================================================
    // FILTER BY STATUS
    // =====================================================

    @GetMapping("/status/{status}")
    public List<Booking> getBookingsByStatus(
            @PathVariable String status) {

        return bookingService.getBookingsByStatus(status);

    }

    // =====================================================
    // ACTIVE BOOKINGS
    // =====================================================

    @GetMapping("/active")
    public List<Booking> getActiveBookingList() {

        return bookingService.getActiveBookingList();

    }

    // =====================================================
    // NEWEST BOOKINGS
    // =====================================================

    @GetMapping("/latest")
    public List<Booking> getLatestBookings() {

        return bookingService.getAllBookingsNewestFirst();

    }

    // =====================================================
    // BOOKINGS BETWEEN DATES
    // =====================================================

    @GetMapping("/between")
    public List<Booking> getBookingsBetweenDates(

            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {

        return bookingService.getBookingsBetweenDates(
                startDate,
                endDate
        );

    }

    // =====================================================
    // RETURNS BETWEEN DATES
    // =====================================================

    @GetMapping("/returns")

    public List<Booking> getReturnsBetweenDates(

            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {

        return bookingService.getReturnsBetweenDates(
                startDate,
                endDate
        );

    }

}