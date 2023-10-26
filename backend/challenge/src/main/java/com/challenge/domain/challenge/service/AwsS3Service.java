package com.challenge.domain.challenge.service;

import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {

    public String uploadFile(MultipartFile image);

}
