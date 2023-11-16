package com.auth.domain.member.service;

import com.auth.domain.member.dto.request.*;
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

    void modifyMember(String accessToken, ModifyMemberReq modifyMemberReq);

    void deleteMember(String accessToken);

    void sendPwEmail(SendPwEmailReq sendPwEmailReq);

    void checkPwLink(CheckPwLinkReq checkPwLinkReq);

    void modifyPw(ModifyPwReq modifyPwReq);

    void modifyProfile(String accessToken, ModifyProfileReq modifyProfileReq);

    Byte findProfile(Long memberId);

}
