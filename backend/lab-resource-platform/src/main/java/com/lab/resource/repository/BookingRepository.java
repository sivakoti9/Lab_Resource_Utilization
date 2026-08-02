package com.lab.resource.repository;

import com.lab.resource.entity.Booking;
import com.lab.resource.entity.Equipment;
import com.lab.resource.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // =====================================================
    // USER BOOKINGS
    // =====================================================

    List<Booking> findByUser(User user);

    List<Booking> findByUserOrderByBookingDateDesc(User user);

    // =====================================================
    // EQUIPMENT BOOKINGS
    // =====================================================

    List<Booking> findByEquipment(Equipment equipment);

    List<Booking> findByEquipmentAndStatusAndActive(
            Equipment equipment,
            String status,
            Boolean active
    );

    List<Booking> findByEquipmentAndStatusOrderByQueuePositionAsc(
            Equipment equipment,
            String status
    );

    Optional<Booking> findFirstByEquipmentAndStatusOrderByQueuePositionAsc(
            Equipment equipment,
            String status
    );

    // =====================================================
    // COUNTS
    // =====================================================

    long countByEquipmentAndStatusAndActive(
            Equipment equipment,
            String status,
            Boolean active
    );

    long countByEquipmentAndStatus(
            Equipment equipment,
            String status
    );

    long countByStatus(String status);

    long countByActive(Boolean active);

    long count();

    // =====================================================
    // FILTERS
    // =====================================================

    List<Booking> findByStatus(String status);

    List<Booking> findByActive(Boolean active);

    List<Booking> findByBookingDate(LocalDate bookingDate);

    List<Booking> findByBookingDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    List<Booking> findByReturnDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    // =====================================================
    // SORTING
    // =====================================================

    List<Booking> findAllByOrderByBookingDateDesc();

    List<Booking> findAllByOrderByReturnDateAsc();

    // =====================================================
    // DASHBOARD
    // =====================================================

    long countByBookingDate(LocalDate bookingDate);

    long countByReturnDate(LocalDate returnDate);

}