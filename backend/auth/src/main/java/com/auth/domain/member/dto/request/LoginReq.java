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
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}",
            message = "비밀번호는 8~20자 영문, 숫자, 특수문자를 사용하세요.")
    private String password;

    private String fcmToken;

}
