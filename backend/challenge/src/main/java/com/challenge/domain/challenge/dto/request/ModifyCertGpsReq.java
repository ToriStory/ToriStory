package com.challenge.domain.challenge.dto.request;

import java.math.BigInteger;

import lombok.Data;

@Data
public class ModifyCertGpsReq {

	private BigInteger challengedId;

	private float latitude;

	private float longitude;

	private String challengeType;

}
