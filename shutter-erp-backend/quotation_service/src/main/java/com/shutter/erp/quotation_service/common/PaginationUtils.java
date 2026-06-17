package com.shutter.erp.quotation_service.common;

import java.util.List;

import org.springframework.data.domain.Page;

public class PaginationUtils {

    private PaginationUtils() {
    }

    public static <T> PaginationResponse<T> build(Page<?> page,List<T> content) {

        return new PaginationResponse<>(
                content,
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }
}