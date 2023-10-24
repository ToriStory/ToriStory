package com.challenge.domain.challenge.dto.request;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class AddCustomReq {

	@NotBlank
	private String content;

	@NotNull
	private LocalDate endDt;

	private boolean displayFlag;

}
