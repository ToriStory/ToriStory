package com.auth.global.config;

import com.auth.global.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        log.debug("SecurityConfig::securityFilterChain() called");
        log.debug("http: {}", http.toString());

        return http
                .httpBasic().disable()
                .cors().and()
                .csrf().disable()
                .logout().disable()
                .authorizeRequests(requests -> requests
                                .antMatchers(HttpMethod.OPTIONS).permitAll()  // preflight 로 보내는 요청

                                // swagger 요청은 모두 허용
                                .antMatchers("/v3/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**", "/swagger-ui/**").permitAll()

                                // member 요청은 일부 허용
                                .antMatchers(HttpMethod.POST, "/login").permitAll()
                                .antMatchers(HttpMethod.POST, "/join").permitAll()
                                .antMatchers(HttpMethod.POST, "/checkEmail").permitAll()
                                .antMatchers(HttpMethod.POST, "/checkCode").permitAll()
                                .antMatchers(HttpMethod.POST, "/refresh").permitAll()
                                .antMatchers(HttpMethod.POST, "/sendPwEmail").permitAll()
                                .antMatchers(HttpMethod.POST, "/checkPwLink").permitAll()
                                .antMatchers(HttpMethod.POST, "/modifyPw").permitAll()

                                // 그 외 요청은 모두 인증 필요
                                .anyRequest().authenticated()
                )
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 사용하지 않으므로 STATELESS 설정
                )
                .addFilterBefore(jwtAuthenticationFilter, BasicAuthenticationFilter.class)
                .build();
    }

}
