package com.lab.resource.service.impl;

import com.lab.resource.dto.ReportDTO;
import com.lab.resource.entity.CostTracking;
import com.lab.resource.entity.Equipment;
import com.lab.resource.repository.BookingRepository;
import com.lab.resource.repository.CostTrackingRepository;
import com.lab.resource.repository.EquipmentRepository;
import com.lab.resource.service.ReportService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final EquipmentRepository equipmentRepository;
    private final BookingRepository bookingRepository;
    private final CostTrackingRepository costTrackingRepository;

    public ReportServiceImpl(
            EquipmentRepository equipmentRepository,
            BookingRepository bookingRepository,
            CostTrackingRepository costTrackingRepository) {

        this.equipmentRepository = equipmentRepository;
        this.bookingRepository = bookingRepository;
        this.costTrackingRepository = costTrackingRepository;
    }

    // =====================================================
    // UTILIZATION & COST ANALYSIS REPORT
    // =====================================================

    @Override
    public List<ReportDTO> getUtilizationAndCostReport() {

        List<Equipment> equipmentList = equipmentRepository.findAll();

        List<ReportDTO> reportList = new ArrayList<>();

        for (Equipment equipment : equipmentList) {

            long bookedQuantity = bookingRepository
                    .countByEquipmentAndStatusAndActive(
                            equipment,
                            "BOOKED",
                            true
                    );

            int totalQuantity = equipment.getQuantity();

            int availableQuantity = totalQuantity - (int) bookedQuantity;

            double utilizationPercentage = 0;

            if (totalQuantity > 0) {
                utilizationPercentage =
                        ((double) bookedQuantity / totalQuantity) * 100;
            }

            double totalCost = 0;

            List<CostTracking> costs =
                    costTrackingRepository.findByEquipment(equipment);

            for (CostTracking cost : costs) {

                if (cost.getAmount() != null) {
                    totalCost += cost.getAmount();
                }

            }

            ReportDTO dto = new ReportDTO();

            dto.setEquipmentName(equipment.getEquipmentName());
            dto.setTotalQuantity(totalQuantity);
            dto.setBookedQuantity(bookedQuantity);
            dto.setAvailableQuantity(availableQuantity);
            dto.setUtilizationPercentage(
                    Math.round(utilizationPercentage * 100.0) / 100.0
            );
            dto.setTotalMaintenanceCost(totalCost);

            reportList.add(dto);

        }

        return reportList;
    }

}