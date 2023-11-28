package com.tori;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ToriApplication {

    public static void main(String[] args) {
        SpringApplication.run(ToriApplication.class, args);
    }

}
