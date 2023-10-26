package com.challenge.domain.challenge.dto.response;

import java.math.BigInteger;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class TotalCustomDto {

	private BigInteger id;

	private String content;

	private long scrapCnt;

	private long reportCnt;

	private Date regDtm;

}
