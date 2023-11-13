package com.notification.domain.notification.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.notification.domain.notification.repository.BasketRepository;
import com.notification.domain.notification.repository.SettingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final FcmService fcmService;
    private final SettingRepository settingRepository;
    private final BasketRepository basketRepository;
    private final RedisTemplate<String, String> redisTemplate;

    @Override
    @Transactional
    @Scheduled(cron = "0 0 9 * * ?")
    public void sendMorningMessage() throws JsonProcessingException {

        fcmService.sendNotificationByFCMToken(
                findNotificationToken(findNotificationMember()),
                "토리 스토리",
                "좋은 아침이에요! 오늘도 도전과 함께 하루를 시작해 보는 건 어떤가요!"
        );
    }

    @Override
    @Transactional
    @Scheduled(cron = "0 0 13 * * ?")
    public void sendAfternoonMessage() throws JsonProcessingException {

        fcmService.sendNotificationByFCMToken(
                findNotificationToken(findNotificationMember()),
                "토리 스토리",
                "점심 먹고 산책 어때요?!? 기분이 좋아질 거예요!"
        );
    }

    @Override
    @Transactional
    @Scheduled(cron = "0 0 21 * * ?")
    public void sendEveningMessage() throws JsonProcessingException {

        fcmService.sendNotificationByFCMToken(
                findNotificationToken(findNotificationMember()),
                "토리 스토리",
                "오늘 하루도 수고 했어요. 내일도 새로운 도전으로 만나요:)"
        );
    }

    @Override
    @Transactional
    @Scheduled(cron = "0 0 0/1 * * ?")
    public void sendLetterMessage() throws JsonProcessingException {
        List<Long> notificationMemberList = findNotificationMember();

        List<Long> notificationLetterList = new ArrayList<>();
        for (Long memberId : notificationMemberList) {
            if (basketRepository.existsByOpenFlagAndSendDtmIsBeforeAndMemberId(false, LocalDateTime.now(), memberId)) {
                notificationLetterList.add(memberId);
            }
        }

        fcmService.sendNotificationByFCMToken(
                findNotificationToken(notificationLetterList),
                "토리 스토리",
                "여우가 도착했어요! 어떤 선물을 가져왔을까요??"
        );
    }

    private List<String> findNotificationToken(List<Long> notificationList) {
        List<String> fcmTokenList = new ArrayList<>();
        for (Long memberId : notificationList) {
            if (redisTemplate.hasKey("FCM Token: " + memberId)) {
                fcmTokenList.add(redisTemplate.opsForValue().get("FCM Token: " + memberId));
            }
        }

        return fcmTokenList;
    }

    private List<Long> findNotificationMember() {
        return settingRepository.findMemberIdByAlarmFlagIsTrue();
    }

}
