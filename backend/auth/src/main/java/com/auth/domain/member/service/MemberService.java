package com.auth.domain.member.service;

import com.auth.domain.member.dto.request.CheckCodeReq;
import com.auth.domain.member.dto.request.JoinReq;
import com.auth.domain.member.dto.request.LoginReq;
import com.auth.domain.member.dto.request.UpdateMemberReq;
import com.auth.domain.member.dto.response.FindIdRes;
import com.auth.domain.member.dto.response.LoginRes;
import com.auth.domain.member.dto.response.MyInfoRes;
import com.auth.domain.member.entity.Member;

public interface MemberService {

    Member findByEmail(String email);

    void join(JoinReq joinReq);

    LoginRes login(LoginReq loginReq);

    FindIdRes findId(String email);

    void logout(String accessToken);

    void checkDuplicateEmail(String email);

    MyInfoRes findMyInfo(String accessToken);

    void sendCodeToEmail(String toEmail);

    void checkCode(CheckCodeReq checkCodeReq);

    void updateMember(String accessToken, UpdateMemberReq updateMemberReq);

    void deleteMember(String accessToken);

}
