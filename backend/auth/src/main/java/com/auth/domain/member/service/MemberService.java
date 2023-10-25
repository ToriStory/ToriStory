package com.auth.domain.member.service;

import com.auth.domain.member.entity.Member;
import com.auth.domain.member.dto.request.JoinReq;

public interface MemberService {

    Member findByEmail(String email);

    void join(JoinReq joinReq);

}
