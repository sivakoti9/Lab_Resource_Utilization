package com.lab.resource.controller;

import com.lab.resource.dto.NotificationDTO;
import com.lab.resource.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {

        this.notificationService = notificationService;

    }

    // =====================================================
    // GET ALL NOTIFICATIONS
    // =====================================================

    @GetMapping
    public List<NotificationDTO> getNotifications() {

        return notificationService.getNotifications();

    }

}