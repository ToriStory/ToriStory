package com.auth.domain.member.service;

import com.auth.domain.member.entity.Member;

public interface MemberService {

    Member findByEmail(String email);

}
