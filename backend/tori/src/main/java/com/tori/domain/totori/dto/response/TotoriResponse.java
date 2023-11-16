package com.tori.domain.totori.dto.response;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TotoriResponse<T> {

    private String totoriNm;

    private T item;

    private int totoriCnt;

}
