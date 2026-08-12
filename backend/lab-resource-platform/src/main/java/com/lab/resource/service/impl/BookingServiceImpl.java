package com.lab.resource.service.impl;

import com.lab.resource.entity.Booking;
import com.lab.resource.entity.Equipment;
import com.lab.resource.repository.BookingRepository;
import com.lab.resource.repository.EquipmentRepository;
import com.lab.resource.service.BookingService;
import org.springframework.stereotype.Service;
import com.lab.resource.entity.User;
import com.lab.resource.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.time.LocalDate;
import java.util.List;
@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final EquipmentRepository equipmentRepository;
    private final UserRepository userRepository;
    public BookingServiceImpl(
            BookingRepository bookingRepository,
            EquipmentRepository equipmentRepository,
            UserRepository userRepository) {

        this.bookingRepository = bookingRepository;
        this.equipmentRepository = equipmentRepository;
        this.userRepository = userRepository;
    }

    // =====================================================
    // CREATE BOOKING
    // =====================================================

    @Override
    public Booking createBooking(Booking booking) {

        Equipment equipment = equipmentRepository
                .findById(booking.getEquipment().getEquipmentId())
                .orElseThrow(() ->
                        new RuntimeException("Equipment not found"));

        booking.setEquipment(equipment);

        long bookedCount =
                bookingRepository.countByEquipmentAndStatusAndActive(
                        equipment,
                        "BOOKED",
                        true
                );

        if (bookedCount < equipment.getQuantity()) {

            booking.setStatus("BOOKED");
            booking.setQueuePosition(0);
            booking.setActive(true);

        } else {

            List<Booking> waitingQueue =
                    bookingRepository
                            .findByEquipmentAndStatusOrderByQueuePositionAsc(
                                    equipment,
                                    "WAITING"
                            );

            booking.setStatus("WAITING");
            booking.setQueuePosition(waitingQueue.size() + 1);
            booking.setActive(false);
        }

        Booking savedBooking = bookingRepository.save(booking);

        updateEquipmentStatus(equipment);

        return savedBooking;
    }

    // =====================================================
    // GET ALL BOOKINGS
    // =====================================================

    @Override
    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();

    }

    // =====================================================
    // GET BOOKING BY ID
    // =====================================================

    @Override
    public Booking getBookingById(Long id) {

        return bookingRepository.findById(id)
                .orElse(null);

    }

    // =====================================================
    // UPDATE BOOKING
    // =====================================================

    @Override
    public Booking updateBooking(Long id, Booking booking) {

        Booking existing =
                bookingRepository.findById(id)
                        .orElse(null);

        if (existing == null) {

            return null;

        }
        validateBookingOwnerOrAdmin(existing);
        existing.setUser(booking.getUser());
        existing.setEquipment(booking.getEquipment());
        existing.setBookingDate(booking.getBookingDate());
        existing.setReturnDate(booking.getReturnDate());
        existing.setStatus(booking.getStatus());

        return bookingRepository.save(existing);
    }

    // =====================================================
    // DELETE BOOKING
    // =====================================================

    @Override
    public void deleteBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        validateBookingOwnerOrAdmin(booking);

        bookingRepository.delete(booking);

    }

    // =====================================================
    // WAITING QUEUE
    // =====================================================

    @Override
    public List<Booking> getWaitingQueue(Long equipmentId) {

        Equipment equipment =
                equipmentRepository.findById(equipmentId)
                        .orElseThrow(() ->
                                new RuntimeException("Equipment not found"));

        return bookingRepository
                .findByEquipmentAndStatusOrderByQueuePositionAsc(
                        equipment,
                        "WAITING"
                );
    }
    // =====================================================
    // RETURN EQUIPMENT
    // =====================================================

    @Override
    public Booking returnEquipment(Long bookingId) {

        Booking returnedBooking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));
        User loggedInUser = getLoggedInUser();

        String role = loggedInUser.getRole().getRoleName();

        if (!(role.equals("ADMIN") ||
                role.equals("LAB_MANAGER") ||
                role.equals("LAB_TECHNICIAN"))) {

            if (!returnedBooking.getUser().getUserId()
                    .equals(loggedInUser.getUserId())) {

                throw new AccessDeniedException(
                        "You cannot return another user's booking.");
            }
        }
        returnedBooking.setStatus("RETURNED");
        returnedBooking.setActive(false);

        bookingRepository.save(returnedBooking);

        Equipment equipment = returnedBooking.getEquipment();

        List<Booking> waitingQueue =
                bookingRepository.findByEquipmentAndStatusOrderByQueuePositionAsc(
                        equipment,
                        "WAITING"
                );

        if (!waitingQueue.isEmpty()) {

            Booking nextBooking = waitingQueue.get(0);

            nextBooking.setStatus("BOOKED");
            nextBooking.setActive(true);
            nextBooking.setQueuePosition(0);

            bookingRepository.save(nextBooking);

            int position = 1;

            for (int i = 1; i < waitingQueue.size(); i++) {

                Booking booking = waitingQueue.get(i);

                booking.setQueuePosition(position++);

                bookingRepository.save(booking);
            }
        }

        updateEquipmentStatus(equipment);

        return returnedBooking;
    }

    // =====================================================
    // APPROVE BOOKING
    // =====================================================

    @Override
    public Booking approveBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        booking.setStatus("BOOKED");
        booking.setActive(true);
        booking.setQueuePosition(0);

        Booking saved = bookingRepository.save(booking);

        updateEquipmentStatus(saved.getEquipment());

        return saved;
    }

    // =====================================================
    // REJECT BOOKING
    // =====================================================

    @Override
    public Booking rejectBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        booking.setStatus("REJECTED");
        booking.setActive(false);

        Booking saved = bookingRepository.save(booking);

        updateEquipmentStatus(saved.getEquipment());

        return saved;
    }

    // =====================================================
    // DASHBOARD STATISTICS
    // =====================================================

    @Override
    public long getTotalBookings() {

        return bookingRepository.count();

    }

    @Override
    public long getBookedCount() {

        return bookingRepository.countByStatus("BOOKED");

    }

    @Override
    public long getReturnedCount() {

        return bookingRepository.countByStatus("RETURNED");

    }

    @Override
    public long getWaitingCount() {

        return bookingRepository.countByStatus("WAITING");

    }

    @Override
    public long getActiveBookings() {

        return bookingRepository.countByActive(true);

    }
    // =====================================================
// TODAY STATISTICS
// =====================================================

    @Override
    public long getTodayBookings() {

        return bookingRepository.countByBookingDate(LocalDate.now());

    }

    @Override
    public long getTodayReturns() {

        return bookingRepository.countByReturnDate(LocalDate.now());

    }

    // =====================================================
    // REPORTS
    // =====================================================

    @Override
    public List<Booking> getBookingsByStatus(String status) {

        return bookingRepository.findByStatus(status);

    }

    @Override
    public List<Booking> getActiveBookingList() {

        return bookingRepository.findByActive(true);

    }

    @Override
    public List<Booking> getAllBookingsNewestFirst() {

        return bookingRepository.findAllByOrderByBookingDateDesc();

    }

    @Override
    public List<Booking> getBookingsBetweenDates(
            LocalDate startDate,
            LocalDate endDate) {

        return bookingRepository.findByBookingDateBetween(
                startDate,
                endDate
        );
    }

    @Override
    public List<Booking> getReturnsBetweenDates(
            LocalDate startDate,
            LocalDate endDate) {

        return bookingRepository.findByReturnDateBetween(
                startDate,
                endDate
        );
    }
    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
    // =====================================================
// USER-SPECIFIC DASHBOARD STATISTICS
// =====================================================

    @Override
    public long getUserTotalBookings() {

        User user = getLoggedInUser();

        return bookingRepository.countByUser(user);
    }

    @Override
    public long getUserBookedCount() {

        User user = getLoggedInUser();

        return bookingRepository.countByUserAndStatus(
                user,
                "BOOKED"
        );
    }

    @Override
    public long getUserReturnedCount() {

        User user = getLoggedInUser();

        return bookingRepository.countByUserAndStatus(
                user,
                "RETURNED"
        );
    }

    @Override
    public long getUserWaitingCount() {

        User user = getLoggedInUser();

        return bookingRepository.countByUserAndStatus(
                user,
                "WAITING"
        );
    }

    @Override
    public long getUserActiveBookings() {

        User user = getLoggedInUser();

        return bookingRepository.countByUserAndActive(
                user,
                true
        );
    }
    private void validateBookingOwnerOrAdmin(Booking booking) {

        User loggedInUser = getLoggedInUser();

        String role = loggedInUser.getRole().getRoleName();

        if (role.equals("ADMIN") || role.equals("LAB_MANAGER")) {
            return;
        }

        if (role.equals("LAB_TECHNICIAN")) {
            throw new AccessDeniedException(
                    "Lab Technician cannot modify bookings.");
        }

        if (!booking.getUser().getUserId()
                .equals(loggedInUser.getUserId())) {

            throw new AccessDeniedException(
                    "You can modify only your own bookings.");
        }
    }
    // =====================================================
    // HELPER METHOD
    // =====================================================

    private void updateEquipmentStatus(Equipment equipment) {

        long bookedCount =
                bookingRepository.countByEquipmentAndStatusAndActive(
                        equipment,
                        "BOOKED",
                        true
                );

        if (bookedCount >= equipment.getQuantity()) {

            equipment.setStatus("UNAVAILABLE");

        } else {

            equipment.setStatus("AVAILABLE");

        }

        equipmentRepository.save(equipment);
    }

}