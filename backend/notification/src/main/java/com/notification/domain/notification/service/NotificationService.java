package com.notification.domain.notification.service;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface NotificationService {

    void sendMorningMessage() throws JsonProcessingException;

    void sendAfternoonMessage() throws JsonProcessingException;

    void sendEveningMessage() throws JsonProcessingException;

    void sendLetterMessage() throws JsonProcessingException;

}
