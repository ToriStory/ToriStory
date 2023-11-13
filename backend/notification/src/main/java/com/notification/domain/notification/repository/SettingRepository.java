package com.notification.domain.notification.repository;

import com.notification.domain.notification.entity.Setting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SettingRepository extends JpaRepository<Setting, Long> {

    @Query("select s.memberId from Setting s where s.alarmFlag = true")
    List<Long> findMemberIdByAlarmFlagIsTrue();

}
