package com.auth.domain.mail.service;

public interface MailService {

    public void sendEmail(String toEmail, String title, String text);

}
