package com.challenge.domain.challenge.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigInteger;

@AllArgsConstructor
@Data
@Builder
public class FindMemoryRes {

	private BigInteger id;

	private String content;

	private String imgUrl;

}
