package com.projectefinal.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ProjecteFinalApplication {

	@Autowired
    private Environment env;
	
	public static void main(String[] args) {
		SpringApplication.run(ProjecteFinalApplication.class, args);
	}

}
