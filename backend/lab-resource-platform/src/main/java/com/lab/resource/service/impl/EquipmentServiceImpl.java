package com.lab.resource.service.impl;

import com.lab.resource.entity.Equipment;
import com.lab.resource.repository.BookingRepository;
import com.lab.resource.repository.EquipmentRepository;
import com.lab.resource.service.EquipmentService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class EquipmentServiceImpl implements EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final BookingRepository bookingRepository;

    public EquipmentServiceImpl(
            EquipmentRepository equipmentRepository,
            BookingRepository bookingRepository) {

        this.equipmentRepository = equipmentRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public Equipment saveEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    @Override
    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    @Override
    public Equipment getEquipmentById(Long id) {
        return equipmentRepository.findById(id).orElse(null);
    }

    @Override
    public Equipment updateEquipment(Long id, Equipment equipment) {

        Equipment existing = equipmentRepository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setEquipmentName(equipment.getEquipmentName());
        existing.setCategory(equipment.getCategory());
        existing.setManufacturer(equipment.getManufacturer());
        existing.setModelNumber(equipment.getModelNumber());
        existing.setSerialNumber(equipment.getSerialNumber());
        existing.setPurchaseDate(equipment.getPurchaseDate());
        existing.setLocation(equipment.getLocation());
        existing.setQuantity(equipment.getQuantity());
        existing.setStatus(equipment.getStatus());

        return equipmentRepository.save(existing);
    }

    @Override
    public void deleteEquipment(Long id) {
        equipmentRepository.deleteById(id);
    }

    @Override
    public List<Map<String, Object>> getEquipmentUtilization() {

        List<Equipment> equipmentList = equipmentRepository.findAll();

        List<Map<String, Object>> utilizationList = new ArrayList<>();

        for (Equipment equipment : equipmentList) {

            long booked = bookingRepository.countByEquipmentAndStatusAndActive(
                    equipment,
                    "BOOKED",
                    true
            );

            int total = equipment.getQuantity();

            int available = total - (int) booked;

            double utilization = 0;

            if (total > 0) {
                utilization = ((double) booked / total) * 100;
            }

            Map<String, Object> data = new LinkedHashMap<>();

            data.put("equipmentId", equipment.getEquipmentId());
            data.put("equipmentName", equipment.getEquipmentName());
            data.put("category", equipment.getCategory());
            data.put("totalQuantity", total);
            data.put("bookedQuantity", booked);
            data.put("availableQuantity", available);
            data.put("utilizationPercentage", Math.round(utilization * 100.0) / 100.0);

            utilizationList.add(data);
        }

        return utilizationList;
    }

}