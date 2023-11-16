package com.challenge.domain.setting.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.challenge.domain.setting.service.SettingService;
import com.challenge.global.response.EnvelopRes;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/setting")
@RequiredArgsConstructor
public class SettingController {

	private final SettingService settingService;

	@GetMapping
	public ResponseEntity<EnvelopRes<Boolean>> findNotificationSetting(@RequestHeader("memberId") Long memberId) {

		return ResponseEntity.status(HttpStatus.OK).body(
			EnvelopRes.<Boolean>builder()
				.data(settingService.findNotificationSetting(memberId))
				.build()
		);
	}

	@PatchMapping
	public ResponseEntity<EnvelopRes> modifyNotificationSetting(@RequestHeader("memberId") Long memberId) {

		settingService.modifyNotificationSetting(memberId);

		return ResponseEntity.status(HttpStatus.OK).body(
			EnvelopRes.builder().build()
		);
	}

}