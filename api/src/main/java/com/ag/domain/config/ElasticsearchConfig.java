package com.ag.domain.config;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.conn.ssl.TrustAllStrategy;
import org.apache.http.ssl.SSLContextBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import javax.net.ssl.SSLContext;

@Configuration
@Slf4j
@Data
@EqualsAndHashCode(callSuper = true)
@EnableElasticsearchRepositories()
@ConfigurationProperties(prefix = "elasticsearch")
public class ElasticsearchConfig extends ElasticsearchConfiguration {
    private String host;
    private String port;
    private String username;
    private String password;

    @Override
    public ClientConfiguration clientConfiguration() {
        return ClientConfiguration.builder()
                .connectedTo(String.format("%s:%s", host, port))
                .usingSsl(buildSslContext())
                .withBasicAuth(username, password)
                .build();
    }

    private SSLContext buildSslContext() {
        try {
            return new SSLContextBuilder()
                    .loadTrustMaterial(null, TrustAllStrategy.INSTANCE)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}