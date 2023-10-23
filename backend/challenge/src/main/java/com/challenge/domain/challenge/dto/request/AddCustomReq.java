package com.challenge.domain.challenge.dto.request;

import java.time.LocalDate;

import lombok.Data;

@Data
public class AddCustomReq {

	private String content;

	private LocalDate endDt;

	private boolean displayFlag;

}
