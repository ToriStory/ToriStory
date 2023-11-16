package com.challenge.domain.setting.service;

public interface SettingService {

	boolean findNotificationSetting(Long memberId);

	void modifyNotificationSetting(Long memberId);

}
