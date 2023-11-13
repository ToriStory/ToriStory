package com.notification.domain.notification.repository;

import com.notification.domain.notification.entity.Basket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface BasketRepository extends JpaRepository<Basket, Long> {

    boolean existsByOpenFlagAndSendDtmIsBeforeAndMemberId(boolean openFlag, LocalDateTime sendDtm, Long memberId);

}
