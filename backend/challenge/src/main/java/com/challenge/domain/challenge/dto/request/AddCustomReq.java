package com.challenge.domain.challenge.dto.request;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class AddCustomReq {

	@NotBlank
	private String content;

	private LocalDate endDt;

	private boolean displayFlag;

}
