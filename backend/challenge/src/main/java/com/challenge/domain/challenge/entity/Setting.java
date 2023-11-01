package com.challenge.domain.challenge.entity;

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

	@Column(nullable = false, columnDefinition = "TINYINT(1)")
	private boolean bgmFlag;

	@Column(nullable = false, columnDefinition = "TINYINT(1)")
	private boolean alarmFlag;

	@Builder
	public Setting(Long memberId, boolean bgmFlag, boolean alarmFlag) {
		this.memberId = memberId;
		this.bgmFlag = bgmFlag;
		this.alarmFlag = alarmFlag;
	}

	public void modifyBgm() {
		this.bgmFlag = !this.bgmFlag;
	}

	public void modifyAlarm() {
		this.alarmFlag = !this.alarmFlag;
	}

}
