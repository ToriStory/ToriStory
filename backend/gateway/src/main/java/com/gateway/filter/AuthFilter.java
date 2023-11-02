package com.gateway.filter;

import com.gateway.exception.AuthException;
import com.gateway.exception.ErrorCode;
import com.gateway.response.EnvelopRes;
import com.gateway.response.FindIdRes;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
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
                        .uri("http://tori-story.com:8201/member/id")
                        .header("Authorization", token)
                        .retrieve()
                        .bodyToMono(new ParameterizedTypeReference<EnvelopRes<FindIdRes>>() {
                        })
                        .onErrorResume(WebClientResponseException.Forbidden.class, e -> {
                            // 403 Forbidden 에러가 발생한 경우
                            return Mono.error(new AuthException(ErrorCode.NOT_VALID_TOKEN));
                        });

                return memberIdMono.flatMap(response -> {
                    if (response.getCode() == 403) {
                        return Mono.error(new AuthException(ErrorCode.NOT_VALID_TOKEN));
                    }
                    Long memberId = response.getData().getId();
                    ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                            .header("memberId", Long.toString(memberId))
                            .build();
                    return chain.filter(exchange.mutate().request(mutatedRequest).build());
                });
            }
            return chain.filter(exchange);
        };
    }

    public static class Config {

    }
}
