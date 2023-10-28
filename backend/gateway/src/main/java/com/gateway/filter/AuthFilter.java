package com.gateway.filter;

import com.gateway.response.EnvelopRes;
import com.gateway.response.FindIdRes;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    @Autowired
    private WebClient.Builder webClientBuilder;

    public AuthFilter(WebClient.Builder webClientBuilder) {
        super(Config.class);
        this.webClientBuilder = webClientBuilder;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String token = exchange.getRequest().getHeaders().getFirst("Authorization");
            if (token != null && !token.isEmpty()) {
                Mono<EnvelopRes<FindIdRes>> memberIdMono = webClientBuilder.build()
                        .post()
                        .uri("http://k9a402.p.ssafy.io:8201/member/id")
                        .header("Authorization", token)
                        .retrieve()
                        .bodyToMono(new ParameterizedTypeReference<EnvelopRes<FindIdRes>>() {
                        });

                return memberIdMono.flatMap(response -> {
                    Long memberId = response.getData().getId();
                    ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                            .header("memberId", Long.toString(memberId))
                            .build();
                    return chain.filter(exchange.mutate().request(mutatedRequest).build());
                }).onErrorResume(e -> {
                    log.info("Error occurred: {}", e.getMessage());
                    return chain.filter(exchange);
                });
            }
            return chain.filter(exchange);
        };
    }

    public static class Config {

    }
}
