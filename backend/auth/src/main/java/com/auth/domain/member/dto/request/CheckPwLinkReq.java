package com.auth.domain.member.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CheckPwLinkReq {

    private String linkCode;

    @Builder
    public CheckPwLinkReq(String linkCode) {
        this.linkCode = linkCode;
    }

}
