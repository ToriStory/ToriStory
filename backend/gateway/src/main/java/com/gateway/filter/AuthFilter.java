package com.gateway.filter;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    @Autowired
    private WebClient.Builder webClientBuilder;

    public AuthFilter(WebClient.Builder webClientBuilder) {
        super(Config.class);  // 이 부분을 추가
        this.webClientBuilder = webClientBuilder;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String token = exchange.getRequest().getHeaders().getFirst("Authorization");
            if (token != null && !token.isEmpty()) {
                Mono<String> userIdMono = webClientBuilder.build()
                        .post()
                        .uri("http://k9a402.p.ssafy.io:8201/member/id")
                        .bodyValue(token)
                        .retrieve()
                        .bodyToMono(String.class);

                return userIdMono.flatMap(userId -> {
                    // 헤더에 userId를 추가
                    exchange.getRequest().mutate().header("userId", userId).build();
                    return chain.filter(exchange.mutate().request(exchange.getRequest()).build());
                }).onErrorResume(e -> chain.filter(exchange));
            }
            return chain.filter(exchange);
        };
    }

    public static class Config {

    }
}
