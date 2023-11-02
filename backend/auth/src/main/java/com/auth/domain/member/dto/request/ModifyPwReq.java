package com.auth.domain.member.dto.request;

import lombok.Getter;

@Getter
public class ModifyPwReq {

    private String linkCode;
    private String newPassword;
    
}
