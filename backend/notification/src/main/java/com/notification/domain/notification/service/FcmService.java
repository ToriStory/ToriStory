package com.notification.domain.notification.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.notification.domain.notification.entity.FcmMessage;
import com.notification.global.exception.ErrorCode;
import com.notification.global.exception.NotificationException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class FcmService {

    @Value("${fcm.project-id}")
    private String PROJECT_ID;

    @Value("${fcm.api-url}")
    private String API_URL;

    @Value("${fcm.firebase-config-path}")
    private String FIREBASE_CONFIG_PATH;

    @Value("${fcm.api-scope}")
    private String API_SCOPE;

    private final ObjectMapper objectMapper;

    public void sendNotificationByFCMToken(List<String> userFCMTokenList, String title, String body) throws JsonProcessingException {
        for (String userFCMToken : userFCMTokenList) {
            if (userFCMToken != null) {
                String message = makeFcmMessage(userFCMToken, title, body);
                try {
                    makeFcmWebPushRequest(message);
                } catch (Exception e) {
                    throw new NotificationException(ErrorCode.FAIL_MAKE_PUSH_MESSAGE);
                }
            }
        }
    }

    private String makeFcmMessage(String targetToken, String title, String body) throws JsonProcessingException {
        FcmMessage fcmMessage = FcmMessage.builder()
                .message(FcmMessage.Message.builder()
                        .token(targetToken)
                        .notification(FcmMessage.Notification.builder()
                                .title(title)
                                .body(body)
                                .image(null)
                                .build()
                        )
                        .build()
                )
                .validateOnly(false)
                .build();
        return objectMapper.writeValueAsString(fcmMessage);
    }

    private void makeFcmWebPushRequest(String message) throws IOException {
        OkHttpClient client = new OkHttpClient();
        Request request;

        RequestBody requestBody = RequestBody
                .create(MediaType.parse("application/json; charset=utf-8"), message);

        request = new Request.Builder()
                .url(API_URL)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                .build();

        Response response = client.newCall(request).execute();

        if (response.isSuccessful()) {
            log.info(" 알림 전송 성공 ");
        } else {
            log.error(" 알림 전송 실패 ");
        }
    }

    private String getAccessToken() throws IOException {

        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource(FIREBASE_CONFIG_PATH).getInputStream())
                .createScoped(List.of(API_SCOPE));

        googleCredentials.refreshIfExpired();

        return googleCredentials.getAccessToken().getTokenValue();

    }

}
