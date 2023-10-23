package com.challenge.domain.challenge.dto.response;

import java.math.BigInteger;
import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class TotalCustomDto {

	private BigInteger id;

	private String content;

	private long scrapCnt;

	private long reportCnt;

	private Date regDtm;

}
