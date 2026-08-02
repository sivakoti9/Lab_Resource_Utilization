package com.lab.resource.service;

import com.lab.resource.entity.Equipment;

import java.util.List;
import java.util.Map;

public interface EquipmentService {

    // Save Equipment
    Equipment saveEquipment(Equipment equipment);

    // Get All Equipment
    List<Equipment> getAllEquipment();

    // Get Equipment By ID
    Equipment getEquipmentById(Long id);

    // Update Equipment
    Equipment updateEquipment(Long id, Equipment equipment);

    // Delete Equipment
    void deleteEquipment(Long id);

    // Equipment Utilization Analytics
    List<Map<String, Object>> getEquipmentUtilization();
}