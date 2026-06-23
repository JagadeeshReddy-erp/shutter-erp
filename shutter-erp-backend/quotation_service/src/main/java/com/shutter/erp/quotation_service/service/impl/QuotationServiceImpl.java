package com.shutter.erp.quotation_service.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shutter.erp.quotation_service.common.ApiResponse;
import com.shutter.erp.quotation_service.common.PaginationResponse;
import com.shutter.erp.quotation_service.dto.request.CreateQuotationRequestDto;
import com.shutter.erp.quotation_service.dto.request.ItemQuotationRequestDto;
import com.shutter.erp.quotation_service.dto.request.ShutterQuotationRequestDto;
import com.shutter.erp.quotation_service.dto.response.ItemQuotationResponseDto;
import com.shutter.erp.quotation_service.dto.response.QuotationResponseDto;
import com.shutter.erp.quotation_service.dto.response.ShutterQuotationResponseDto;
import com.shutter.erp.quotation_service.entity.ItemQuotation;
import com.shutter.erp.quotation_service.entity.Quotation;
import com.shutter.erp.quotation_service.entity.ShutterQuotation;
import com.shutter.erp.quotation_service.enums.QuotationStatus;
import com.shutter.erp.quotation_service.enums.ShutterStatus;
import com.shutter.erp.quotation_service.exception.ResourceNotFoundException;
import com.shutter.erp.quotation_service.mapper.QuotationMapper;
import com.shutter.erp.quotation_service.repository.ItemQuotationRepository;
import com.shutter.erp.quotation_service.repository.QuotationRepository;
import com.shutter.erp.quotation_service.repository.ShutterQuotationRepository;
import com.shutter.erp.quotation_service.service.QuotationService;
import com.shutter.erp.quotation_service.util.CalculationUtil;
import com.shutter.erp.quotation_service.util.QuotationNumberGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class QuotationServiceImpl implements QuotationService {

	private final QuotationRepository quotationRepository;

	private final ShutterQuotationRepository shutterQuotationRepository;

	private final ItemQuotationRepository itemQuotationRepository;

	private final QuotationMapper quotationMapper;

	private final QuotationNumberGenerator quotationNumberGenerator;

	private final CalculationUtil calculationUtil;

	@Override
	@Transactional
	public ApiResponse<QuotationResponseDto> createQuotation(CreateQuotationRequestDto requestDto) {

		String quotationNo = quotationNumberGenerator.generateQuotationNumber();

		Quotation quotation = buildQuotationEntity(requestDto, quotationNo);

		quotation.setVersionNo(1);

		quotation = quotationRepository.save(quotation);

		BigDecimal quotationTotalAmount = BigDecimal.ZERO;
		BigDecimal quotationTotalProfit = BigDecimal.ZERO;

		List<ShutterQuotationResponseDto> shutterResponses = new ArrayList<>();

		for (ShutterQuotationRequestDto shutterDto : requestDto.getShutters()) {

			ShutterQuotation shutterQuotation = buildShutterEntity(quotation.getId(), shutterDto);

			shutterQuotation = shutterQuotationRepository.save(shutterQuotation);

			BigDecimal shutterAmount = BigDecimal.ZERO;
			BigDecimal shutterProfit = BigDecimal.ZERO;

			List<ItemQuotationResponseDto> itemResponses = new ArrayList<>();

			for (ItemQuotationRequestDto itemDto : shutterDto.getItems()) {

				ItemQuotation itemQuotation = buildItemEntity(shutterQuotation.getId(), itemDto);

				calculateItemValues(itemQuotation);

				itemQuotation = itemQuotationRepository.save(itemQuotation);

				shutterAmount = shutterAmount.add(itemQuotation.getAmount());

				shutterProfit = shutterProfit.add(itemQuotation.getProfit());

				itemResponses.add(quotationMapper.toItemResponseDto(itemQuotation));
			}

			shutterQuotation.setShutterTotalAmount(shutterAmount);

			shutterQuotation.setShutterTotalProfit(shutterProfit);

			shutterQuotation = shutterQuotationRepository.save(shutterQuotation);

			quotationTotalAmount = quotationTotalAmount.add(shutterAmount);

			quotationTotalProfit = quotationTotalProfit.add(shutterProfit);

			ShutterQuotationResponseDto shutterResponse = quotationMapper.toShutterResponseDto(shutterQuotation,
					itemResponses);

			shutterResponses.add(shutterResponse);
		}

		BigDecimal gstAmount = calculationUtil.calculateGstAmount(quotationTotalAmount, requestDto.getGstPercentage());

		BigDecimal grandTotal = calculationUtil.calculateGrandTotal(quotationTotalAmount, gstAmount);

		quotation.setTotalAmount(quotationTotalAmount);

		quotation.setTotalProfit(quotationTotalProfit);

		quotation.setGstAmount(gstAmount);

		quotation.setGrandTotal(grandTotal);

		quotation = quotationRepository.save(quotation);

		QuotationResponseDto responseDto = quotationMapper.toQuotationResponseDto(quotation, shutterResponses);

		return new ApiResponse<>(true, "Quotation created successfully", responseDto);
	}

	@Override
	public ApiResponse<QuotationResponseDto> getQuotationById(
	        Long quotationId) {

	    Quotation quotation = getQuotation(quotationId);

	    List<ShutterQuotation> shutters =
	            shutterQuotationRepository.findByQuotationId(
	                    quotationId);

	    List<ShutterQuotationResponseDto> shutterResponses =
	            new ArrayList<>();

	    for (ShutterQuotation shutter : shutters) {

	        List<ItemQuotation> items =
	                itemQuotationRepository
	                        .findByShutterQuotationId(
	                                shutter.getId());

	        List<ItemQuotationResponseDto> itemResponses =
	                items.stream()
	                        .map(quotationMapper::toItemResponseDto)
	                        .toList();

	        shutterResponses.add(
	                quotationMapper.toShutterResponseDto(
	                        shutter,
	                        itemResponses));
	    }

	    QuotationResponseDto responseDto =
	            quotationMapper.toQuotationResponseDto(
	                    quotation,
	                    shutterResponses);

	    return new ApiResponse<>(
	            true,
	            "Quotation fetched successfully",
	            responseDto);
	}

	@Override
	@Transactional
	public ApiResponse<String> deleteQuotation(
	        Long quotationId) {

	    Quotation quotation = getQuotation(quotationId);

	    List<ShutterQuotation> shutters =
	            shutterQuotationRepository.findByQuotationId(
	                    quotationId);

	    for (ShutterQuotation shutter : shutters) {

	        itemQuotationRepository
	                .deleteByShutterQuotationId(
	                        shutter.getId());
	    }

	    shutterQuotationRepository
	            .deleteByQuotationId(
	                    quotationId);

	    quotationRepository.delete(quotation);

	    return new ApiResponse<>(
	            true,
	            "Quotation deleted successfully",
	            "Deleted");
	}

	@Override
	public ApiResponse<PaginationResponse<QuotationResponseDto>> getAllQuotations(
	        int pageNo,
	        int pageSize,
	        LocalDate fromDate,
	        LocalDate toDate) {

	    // Sort by ID DESC (hardcoded)
	    Sort sort = Sort.by("id").descending();
	    Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

	    LocalDateTime startDateTime = fromDate.atStartOfDay();
	    LocalDateTime endDateTime = toDate.atTime(LocalTime.MAX);

	    Page<Quotation> quotationPage =
	            quotationRepository.findByCreatedAtBetween(startDateTime, endDateTime, pageable);

	    List<QuotationResponseDto> quotationResponses =
	            quotationPage.getContent()
	                    .stream()
	                    .map(quotation -> {
	                        QuotationResponseDto dto = new QuotationResponseDto();
	                        dto.setId(quotation.getId());
	                        dto.setQuotationNo(quotation.getQuotationNo());
	                        dto.setVersionNo(quotation.getVersionNo());
	                        dto.setCustomerId(quotation.getCustomerId());
	                        dto.setTotalAmount(quotation.getTotalAmount());
	                        dto.setTotalProfit(quotation.getTotalProfit());
	                        dto.setGstPercentage(quotation.getGstPercentage());
	                        dto.setGstAmount(quotation.getGstAmount());
	                        dto.setGrandTotal(quotation.getGrandTotal());
	                        dto.setStatus(quotation.getStatus());
	                        return dto;
	                    })
	                    .toList();

	    PaginationResponse<QuotationResponseDto> paginationResponse =
	            new PaginationResponse<>(
	                    quotationResponses,
	                    quotationPage.getNumber(),
	                    quotationPage.getSize(),
	                    quotationPage.getTotalElements(),
	                    quotationPage.getTotalPages(),
	                    quotationPage.isLast());

	    return new ApiResponse<>(true, "Quotations fetched successfully", paginationResponse);
	}
	
	
	@Override
	public ApiResponse<PaginationResponse<QuotationResponseDto>> getQuotationsByCustomerId(
	        Long customerId,
	        int pageNo,
	        int pageSize) {

	    Pageable pageable = PageRequest.of(
	            pageNo,
	            pageSize,
	            Sort.by("id").descending());

	    Page<Quotation> quotationPage =
	            quotationRepository.findByCustomerId(customerId, pageable);

	    List<QuotationResponseDto> quotationResponses =
	            quotationPage.getContent()
	                    .stream()
	                    .map(quotation -> {

	                        QuotationResponseDto dto = new QuotationResponseDto();

	                        dto.setId(quotation.getId());
	                        dto.setQuotationNo(quotation.getQuotationNo());
	                        dto.setVersionNo(quotation.getVersionNo());
	                        dto.setCustomerId(quotation.getCustomerId());
	                        dto.setTotalAmount(quotation.getTotalAmount());
	                        dto.setTotalProfit(quotation.getTotalProfit());
	                        dto.setGstPercentage(quotation.getGstPercentage());
	                        dto.setGstAmount(quotation.getGstAmount());
	                        dto.setGrandTotal(quotation.getGrandTotal());
	                        dto.setStatus(quotation.getStatus());

	                        // IMPORTANT: no shutters
	                        dto.setShutters(Collections.emptyList());

	                        return dto;
	                    })
	                    .toList();

	    PaginationResponse<QuotationResponseDto> pagination =
	            new PaginationResponse<>(
	                    quotationResponses,
	                    quotationPage.getNumber(),
	                    quotationPage.getSize(),
	                    quotationPage.getTotalElements(),
	                    quotationPage.getTotalPages(),
	                    quotationPage.isLast());

	    return new ApiResponse<>(
	            true,
	            "Quotations fetched successfully for customer",
	            pagination);
	}
	
	@Override
	@Transactional
	public ApiResponse<QuotationResponseDto> updateQuotation(
	        Long quotationId,
	        CreateQuotationRequestDto requestDto) {

	    // STEP 1: Fetch existing quotation
	    Quotation oldQuotation = getQuotation(quotationId);


	    // Validation: Expired quotations cannot be updated
	    if (QuotationStatus.EXPIRED.equals(oldQuotation.getStatus())) {
	    	 return new ApiResponse<>(
	    	            false,
	    	            "Expired quotations cannot be updated.",
	    	            null
	    	    );
	    }
	    
	    // STEP 2: Mark old quotation as expired
	    oldQuotation.setStatus(QuotationStatus.EXPIRED);
	    quotationRepository.save(oldQuotation);

	    // STEP 3: Create NEW quotation (versioned copy)
	    Quotation newQuotation = buildQuotationEntity(
	            requestDto,
	            oldQuotation.getQuotationNo());

	    newQuotation.setVersionNo(oldQuotation.getVersionNo() + 1);

	    newQuotation = quotationRepository.save(newQuotation);

	    BigDecimal quotationTotalAmount = BigDecimal.ZERO;
	    BigDecimal quotationTotalProfit = BigDecimal.ZERO;

	    List<ShutterQuotationResponseDto> shutterResponses = new ArrayList<>();

	    // STEP 4: Rebuild shutters + items
	    for (ShutterQuotationRequestDto shutterDto : requestDto.getShutters()) {

	        ShutterQuotation shutterQuotation =
	                buildShutterEntity(newQuotation.getId(), shutterDto);

	        shutterQuotation = shutterQuotationRepository.save(shutterQuotation);

	        BigDecimal shutterAmount = BigDecimal.ZERO;
	        BigDecimal shutterProfit = BigDecimal.ZERO;

	        List<ItemQuotationResponseDto> itemResponses = new ArrayList<>();

	        for (ItemQuotationRequestDto itemDto : shutterDto.getItems()) {

	            ItemQuotation itemQuotation =
	                    buildItemEntity(shutterQuotation.getId(), itemDto);

	            calculateItemValues(itemQuotation);

	            itemQuotation = itemQuotationRepository.save(itemQuotation);

	            shutterAmount = shutterAmount.add(itemQuotation.getAmount());
	            shutterProfit = shutterProfit.add(itemQuotation.getProfit());

	            itemResponses.add(quotationMapper.toItemResponseDto(itemQuotation));
	        }

	        shutterQuotation.setShutterTotalAmount(shutterAmount);
	        shutterQuotation.setShutterTotalProfit(shutterProfit);

	        shutterQuotation = shutterQuotationRepository.save(shutterQuotation);

	        quotationTotalAmount = quotationTotalAmount.add(shutterAmount);
	        quotationTotalProfit = quotationTotalProfit.add(shutterProfit);

	        shutterResponses.add(
	                quotationMapper.toShutterResponseDto(shutterQuotation, itemResponses));
	    }

	    // STEP 5: GST calculation
	    BigDecimal gstAmount = calculationUtil.calculateGstAmount(
	            quotationTotalAmount,
	            requestDto.getGstPercentage());

	    BigDecimal grandTotal = calculationUtil.calculateGrandTotal(
	            quotationTotalAmount,
	            gstAmount);

	    newQuotation.setTotalAmount(quotationTotalAmount);
	    newQuotation.setTotalProfit(quotationTotalProfit);
	    newQuotation.setGstAmount(gstAmount);
	    newQuotation.setGrandTotal(grandTotal);

	    newQuotation = quotationRepository.save(newQuotation);

	    // STEP 6: Response mapping
	    QuotationResponseDto responseDto =
	            quotationMapper.toQuotationResponseDto(newQuotation, shutterResponses);

	    return new ApiResponse<>(
	            true,
	            "Quotation updated successfully (new version created)",
	            responseDto);
	}

	private ShutterQuotation buildShutterEntity(Long quotationId, ShutterQuotationRequestDto shutterDto) {

		ShutterQuotation shutterQuotation = new ShutterQuotation();

		shutterQuotation.setQuotationId(quotationId);

		shutterQuotation.setShutterNo(shutterDto.getShutterNo());

		shutterQuotation.setWidth(shutterDto.getWidth());

		shutterQuotation.setHeight(shutterDto.getHeight());

		shutterQuotation.setShutterTotalAmount(BigDecimal.ZERO);

		shutterQuotation.setShutterTotalProfit(BigDecimal.ZERO);

		shutterQuotation.setStatus(ShutterStatus.DRAFT);

		return shutterQuotation;
	}

	private ItemQuotation buildItemEntity(Long shutterQuotationId, ItemQuotationRequestDto itemDto) {

		ItemQuotation itemQuotation = new ItemQuotation();

		itemQuotation.setShutterQuotationId(shutterQuotationId);

		itemQuotation.setItemId(itemDto.getItemId());

		itemQuotation.setItemNameSnapshot(itemDto.getItemNameSnapshot());

		itemQuotation.setItemTypeSnapshot(itemDto.getItemTypeSnapshot());

		itemQuotation.setQuantity(itemDto.getQuantity());

		itemQuotation.setReferencePrice(itemDto.getReferencePrice());

		itemQuotation.setCustomerPrice(itemDto.getCustomerPrice());

		return itemQuotation;
	}

	private Quotation buildQuotationEntity(CreateQuotationRequestDto requestDto, String quotationNo) {

		Quotation quotation = new Quotation();

		quotation.setQuotationNo(quotationNo);
		quotation.setVersionNo(1);

		quotation.setCustomerId(requestDto.getCustomerId());

		quotation.setTotalAmount(BigDecimal.ZERO);
		quotation.setTotalProfit(BigDecimal.ZERO);

		quotation.setGstPercentage(requestDto.getGstPercentage());

		quotation.setGstAmount(BigDecimal.ZERO);
		quotation.setGrandTotal(BigDecimal.ZERO);

		quotation.setStatus(QuotationStatus.DRAFT);

		return quotation;
	}

	private void calculateItemValues(ItemQuotation itemQuotation) {

		BigDecimal amount = calculationUtil.calculateAmount(itemQuotation.getQuantity(),
				itemQuotation.getCustomerPrice());

		BigDecimal profit = calculationUtil.calculateProfit(itemQuotation.getQuantity(),
				itemQuotation.getReferencePrice(), itemQuotation.getCustomerPrice());

		itemQuotation.setAmount(amount);
		itemQuotation.setProfit(profit);
	}

	private Quotation getQuotation(Long quotationId) {

	    return quotationRepository.findById(quotationId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Quotation not found with id : "
	                                    + quotationId));
	}
	
}