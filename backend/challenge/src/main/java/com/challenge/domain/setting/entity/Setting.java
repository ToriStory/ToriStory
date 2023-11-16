package com.challenge.domain.setting.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Setting {

	@Id
	@Column(nullable = false, columnDefinition = "INT UNSIGNED")
	private Long memberId;

	@Column(columnDefinition = "TINYINT(1) DEFAULT 1")
	private boolean bgmFlag;

	@Column(columnDefinition = "TINYINT(1) DEFAULT 1")
	private boolean notificationFlag;

	@Builder
	public Setting(Long memberId, boolean bgmFlag, boolean notificationFlag) {
		this.memberId = memberId;
		this.bgmFlag = bgmFlag;
		this.notificationFlag = notificationFlag;
	}

	public void modifyBgm() {
		this.bgmFlag = !this.bgmFlag;
	}

	public void modifyNotification() {
		this.notificationFlag = !this.notificationFlag;
	}

}
