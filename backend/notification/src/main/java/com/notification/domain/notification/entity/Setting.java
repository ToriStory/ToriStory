package com.notification.domain.notification.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Setting {

    @Id
    private Long memberId;

    private boolean bgmFlag;

    private boolean notificationFlag;

}
