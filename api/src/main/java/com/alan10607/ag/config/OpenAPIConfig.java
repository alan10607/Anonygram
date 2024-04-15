package com.alan10607.ag.config;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;

import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
        info = @Info(
                title = "Anonygram Open API Document",
                version = "1.0",
                description = "This document is for front-end developing"
        ),
        externalDocs = @ExternalDocumentation(
                description = "More information about author",
                url = "https://github.com/alan10607/"
        )
)
public class OpenAPIConfig {
}