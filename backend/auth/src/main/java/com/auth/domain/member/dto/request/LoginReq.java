package com.auth.domain.member.dto.request;

import lombok.Getter;

import javax.validation.constraints.*;

@Getter
public class LoginReq {

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "이메일 형식을 지켜주세요.")
    @Size(max = 320, message = "이메일은 320자를 넘을 수 없습니다.")
    private String email;

    @NotNull(message = "비밀번호를 입력해주세요.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$", message = "비밀번호는 영문, 숫자를 포함하여 8~20자로 입력해주세요.")
    private String password;

}
