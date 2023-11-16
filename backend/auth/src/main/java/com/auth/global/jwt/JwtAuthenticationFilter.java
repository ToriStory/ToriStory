package com.auth.global.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        log.debug("request uri: {}", request.getRequestURI());
        log.debug("request url: {}", request.getRequestURL());
        log.debug("JwtAuthenticationFilter::doFilterInternal() called");

        String token = request.getHeader("Authorization"); // header에서 token 꺼내기

        if (request.getHeader("Authorization") == null) {
            log.debug("Authorization header is null");
            filterChain.doFilter(request, response);
            return;
        }

        token = jwtProvider.removeBearer(token);
        log.debug("Authentication Filter - token: {}", token);
        if (!jwtProvider.validateToken(token)){
            log.debug("token is not valid");
            filterChain.doFilter(request, response);
            return;
        }

        String email = jwtProvider.extractEmail(token);
        AbstractAuthenticationToken authentication = UsernamePasswordAuthenticationToken.authenticated(
                email,
                token,
                Collections.emptyList()
        );
        authentication.setDetails(new WebAuthenticationDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);

    }

}
