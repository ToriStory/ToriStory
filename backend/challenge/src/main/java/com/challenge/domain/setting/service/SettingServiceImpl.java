package com.challenge.domain.setting.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.challenge.domain.setting.entity.Setting;
import com.challenge.domain.setting.repository.SettingRepository;
import com.challenge.global.exception.ChallengeException;
import com.challenge.global.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class SettingServiceImpl implements SettingService {

	private final SettingRepository settingRepository;

	@Override
	public boolean findNotificationSetting(Long memberId) {
		Setting setting = settingRepository.findById(memberId)
			.orElseThrow(() -> new ChallengeException(ErrorCode.SETTING_NOT_FOUND));

		return setting.isNotificationFlag();
	}

	@Override
	public void modifyNotificationSetting(Long memberId) {
		Setting setting = settingRepository.findById(memberId)
			.orElseThrow(() -> new ChallengeException(ErrorCode.SETTING_NOT_FOUND));

		setting.modifyNotification();
	}

}