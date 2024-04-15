package com.ag.domain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication()
public class AnonygramApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnonygramApplication.class, args);
	}

}