package com.challenge.domain.setting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.challenge.domain.setting.entity.Setting;

@Repository
public interface SettingRepository extends JpaRepository<Setting, Long> {
}
