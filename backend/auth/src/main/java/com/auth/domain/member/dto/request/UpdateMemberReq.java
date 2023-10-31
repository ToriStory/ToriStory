package com.auth.domain.member.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
public class UpdateMemberReq {

    @NotBlank
    @Size(max = 8, message = "닉네임은 8자를 넘을 수 없습니다.")
    private String nickname;

    @NotNull(message = "비밀번호를 입력해주세요.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$", message = "비밀번호는 영문, 숫자를 포함하여 8~20자로 입력해주세요.")
    private String password;

}
