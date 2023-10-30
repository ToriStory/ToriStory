package com.auth.domain.member.dto.request;

import lombok.Getter;

@Getter
public class CheckCodeReq {

    private String email;
    private String code;

}
