package com.auth.domain.member.dto.request;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
public class CheckCodeReq {

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "이메일 형식을 지켜주세요.")
    @Size(max = 320, message = "이메일은 320자를 넘을 수 없습니다.")
    private String email;
    private String code;

}
