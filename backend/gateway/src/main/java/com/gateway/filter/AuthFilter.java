package com.gateway.filter;

import com.gateway.exception.AuthException;
import com.gateway.exception.ErrorCode;
import com.gateway.response.EnvelopRes;
import com.gateway.response.FindIdRes;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ServerWebExchange;
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
        return (exchange, chain) -> processExchange(exchange, chain)
                .onErrorResume(AuthException.class, e -> handleAuthException(exchange, e));
    }

    private Mono<Void> processExchange(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        if (token != null && !token.isEmpty()) {
            Mono<EnvelopRes<FindIdRes>> memberIdMono = webClientBuilder.build()
                    .post()
                    .uri("http://tori-story.com:8201/member/id")
                    .header("Authorization", token)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<EnvelopRes<FindIdRes>>() {})
                    .onErrorResume(WebClientResponseException.Forbidden.class, e -> {
                        return Mono.error(new AuthException(ErrorCode.NOT_VALID_TOKEN));
                    });

            return memberIdMono.flatMap(response -> {
                Long memberId = response.getData().getId();
                ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                        .header("memberId", Long.toString(memberId))
                        .build();
                return chain.filter(exchange.mutate().request(mutatedRequest).build());
            });
        }
        return chain.filter(exchange);
    }

    // AuthException 발생 시 클라이언트에 반환할 응답 생성
    private Mono<Void> handleAuthException(ServerWebExchange exchange, AuthException e) {
        log.info("AuthException 발생...");

        EnvelopRes<String> errorResponse = EnvelopRes.<String>builder()
                .code(e.getErrorCode().getCode())
                .message(e.getMessage())
                .data(e.getErrorCode().getMessage())
                .build();

        exchange.getResponse().setStatusCode(HttpStatus.valueOf(e.getErrorCode().getCode()));

        return exchange.getResponse().writeWith(
                Mono.just(exchange.getResponse().bufferFactory().wrap(errorResponse.toString().getBytes()))
        );
    }

    public static class Config {

    }
}
