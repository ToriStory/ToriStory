package com.auth.domain.member.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
public class ModifyPwReq {

    private String linkCode;

    @NotNull(message = "비밀번호를 입력해주세요.")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}",
            message = "비밀번호는 8~20자 영문, 숫자, 특수문자를 사용하세요.")
    private String newPassword;
    
}
