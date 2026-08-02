package com.lab.resource.controller;

import com.lab.resource.entity.Equipment;
import com.lab.resource.service.EquipmentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

    private final EquipmentService equipmentService;

    public EquipmentController(EquipmentService equipmentService) {
        this.equipmentService = equipmentService;
    }

    // ADMIN + LAB_MANAGER
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER')")
    public Equipment addEquipment(@RequestBody Equipment equipment) {
        return equipmentService.saveEquipment(equipment);
    }

    // Everyone logged in
    @GetMapping
    public List<Equipment> getAllEquipment() {
        return equipmentService.getAllEquipment();
    }

    // Everyone logged in
    @GetMapping("/{id}")
    public Equipment getEquipmentById(@PathVariable Long id) {
        return equipmentService.getEquipmentById(id);
    }

    // ADMIN + LAB_MANAGER + LAB_TECHNICIAN
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER','LAB_TECHNICIAN')")
    public Equipment updateEquipment(
            @PathVariable Long id,
            @RequestBody Equipment equipment) {

        return equipmentService.updateEquipment(id, equipment);
    }

    // ADMIN only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteEquipment(@PathVariable Long id) {

        equipmentService.deleteEquipment(id);

        return "Equipment deleted successfully";
    }

    // ==============================
    // Equipment Utilization Analytics
    // ==============================

    @GetMapping("/utilization")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER','DEPARTMENT_HEAD')")
    public List<Map<String, Object>> getEquipmentUtilization() {

        return equipmentService.getEquipmentUtilization();

    }
}