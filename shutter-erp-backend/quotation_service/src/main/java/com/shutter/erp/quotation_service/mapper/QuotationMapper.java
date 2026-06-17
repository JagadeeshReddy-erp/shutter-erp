package com.shutter.erp.quotation_service.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.shutter.erp.quotation_service.dto.response.ItemQuotationResponseDto;
import com.shutter.erp.quotation_service.dto.response.QuotationResponseDto;
import com.shutter.erp.quotation_service.dto.response.ShutterQuotationResponseDto;
import com.shutter.erp.quotation_service.entity.ItemQuotation;
import com.shutter.erp.quotation_service.entity.Quotation;
import com.shutter.erp.quotation_service.entity.ShutterQuotation;

@Component
public class QuotationMapper {

    public QuotationResponseDto toQuotationResponseDto(
            Quotation quotation,
            List<ShutterQuotationResponseDto> shutters) {

        QuotationResponseDto responseDto =
                new QuotationResponseDto();

        responseDto.setId(quotation.getId());
        responseDto.setQuotationNo(
                quotation.getQuotationNo());

        responseDto.setVersionNo(
                quotation.getVersionNo());

        responseDto.setCustomerId(
                quotation.getCustomerId());

        responseDto.setTotalAmount(
                quotation.getTotalAmount());

        responseDto.setTotalProfit(
                quotation.getTotalProfit());

        responseDto.setGstPercentage(
                quotation.getGstPercentage());

        responseDto.setGstAmount(
                quotation.getGstAmount());

        responseDto.setGrandTotal(
                quotation.getGrandTotal());

        responseDto.setStatus(
                quotation.getStatus());

        responseDto.setShutters(shutters);

        return responseDto;
    }

    public ShutterQuotationResponseDto toShutterResponseDto(
            ShutterQuotation shutterQuotation,
            List<ItemQuotationResponseDto> items) {

        ShutterQuotationResponseDto responseDto =
                new ShutterQuotationResponseDto();

        responseDto.setId(shutterQuotation.getId());

        responseDto.setShutterNo(
                shutterQuotation.getShutterNo());

        responseDto.setWidth(
                shutterQuotation.getWidth());

        responseDto.setHeight(
                shutterQuotation.getHeight());

        responseDto.setShutterTotalAmount(
                shutterQuotation.getShutterTotalAmount());

        responseDto.setShutterTotalProfit(
                shutterQuotation.getShutterTotalProfit());

        responseDto.setStatus(
                shutterQuotation.getStatus());

        responseDto.setItems(items);

        return responseDto;
    }

    public ItemQuotationResponseDto toItemResponseDto(
            ItemQuotation itemQuotation) {

        ItemQuotationResponseDto responseDto =
                new ItemQuotationResponseDto();

        responseDto.setId(itemQuotation.getId());

        responseDto.setItemId(
                itemQuotation.getItemId());

        responseDto.setItemNameSnapshot(
                itemQuotation.getItemNameSnapshot());

        responseDto.setItemTypeSnapshot(
                itemQuotation.getItemTypeSnapshot());

        responseDto.setQuantity(
                itemQuotation.getQuantity());

        responseDto.setReferencePrice(
                itemQuotation.getReferencePrice());

        responseDto.setCustomerPrice(
                itemQuotation.getCustomerPrice());

        responseDto.setAmount(
                itemQuotation.getAmount());

        responseDto.setProfit(
                itemQuotation.getProfit());

        return responseDto;
    }

    public List<ItemQuotationResponseDto> toItemResponseDtoList(
            List<ItemQuotation> items) {

        return items.stream()
                .map(this::toItemResponseDto)
                .collect(Collectors.toList());
    }
}