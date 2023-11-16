package com.thank.global.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class EnvelopRes<T> {

	@Builder.Default
	private int code = 200;

	@Builder.Default
	private String message = "success";

	private T data;

}
