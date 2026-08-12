package com.lab.resource.service;

import com.lab.resource.dto.NotificationDTO;

import java.util.List;

public interface NotificationService {

    // =====================================================
    // ALL NOTIFICATIONS
    // =====================================================

    List<NotificationDTO> getNotifications();

}