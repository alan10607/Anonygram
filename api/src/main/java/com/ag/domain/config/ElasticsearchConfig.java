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
import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.UnknownHostException;

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
        log.info("Elasticsearch url={}:{}, is port open={}", host, port, isPortOpen(host, Integer.parseInt(port)));
        return ClientConfiguration.builder()
                .connectedTo(String.format("%s:%s", host, port))
                .withBasicAuth(username, password)
                .build();
    }

    public boolean isPortOpen(String host, int port) {
        try (Socket socket = new Socket()) {
            socket.connect(new InetSocketAddress(host, port), 1000);
            return true;
        } catch (Exception ex) {
            return false;
        }
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