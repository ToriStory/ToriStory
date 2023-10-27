package com.challenge.domain.challenge.dto.response;

import java.math.BigInteger;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class FindCustomRes {

	private BigInteger id;

	private String content;

	private LocalDate startDt;

	private LocalDate endDt;

	private boolean compFlag;

	private String imgUrl;

}
