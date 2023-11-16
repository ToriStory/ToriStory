package com.auth.domain.member.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class ModifyProfileReq {

    @NotBlank(message = "프로필 이미지를 선택해주세요.")
    private String imgUrl;

    @NotNull
    private Byte profile;

}
