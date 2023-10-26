package com.challenge.domain.challenge.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.math.BigInteger;

@Setter
@Getter
public class FindCustomSearchReq {

    private String keyword;

    @Min(0)
    @Max(1)
    private int sort;

    @Min(0)
    private BigInteger cursor;

    @Min(0)
    private int page;

    @Min(1)
    private int limit;

    public FindCustomSearchReq() {
        this.keyword = "";
        this.sort = 0;
        this.cursor = BigInteger.ZERO;
        this.page = 0;
        this.limit = 1;
    }

}
