package com.auth.global.jwt;

import com.auth.global.exception.AuthException;
import com.auth.global.exception.ErrorCode;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final JwtProperties jwtProperties;
    private final RedisTemplate<String, String> redisTemplate;
    private final RedisTemplate<String, String> redisBlackListTemplate;

    /**
     * 토큰에서 모든 정보 추출
     *
     * @param token
     * @return 토큰에 담긴 정보
     */
    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * 토큰에서 email 추출
     *
     * @param token
     * @return email
     */
    public String extractEmail(String token) {

        log.debug("JwtProvider::extractEmail() called");

        token = removeBearer(token);

        log.debug("token: " + token);
        log.debug("email: " + extractAllClaims(token).get("email", String.class));

        return extractAllClaims(token).get("email", String.class);
    }

    /**
     * jwt secret key를 String -> Key 타입으로 변환
     *
     * @return Key 타입의 jwt secret key
     */
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Token 만료 여부 확인
     *
     * @param token
     * @return 만료 여부
     */
    public Boolean isTokenExpired(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }

    /**
     * 사용자 email로 accessToken 생성
     *
     * @param email
     * @return 생성된 accessToken
     */
    public String generateAccessToken(String email) {
        return generateToken(email, jwtProperties.getAccessTokenValidity());
    }

    /**
     * 사용자 email로 refreshToken 생성 및 저장
     *
     * @param email
     * @return 생성된 refreshToken
     */
    public String generateRefreshToken(String email) {
        String refreshToken = generateToken(email, jwtProperties.getRefreshTokenValidity());
        storeToken(refreshToken, email);
        return refreshToken;
    }

    /**
     * refreshToken을 cache에 저장
     *
     * @param token
     * @param email
     */
    public void storeToken(String token, String email) {
        redisTemplate.opsForValue().set(
                email,
                token,
                jwtProperties.getRefreshTokenValidity(),
                TimeUnit.MILLISECONDS);
    }

    /**
     * 로그아웃 시 accessToken을 남은 시간만큼 blackList에 저장
     *
     * @param token
     * @param email
     */
    public void setBlackList(String token, String email) {

        token = removeBearer(token);

        redisBlackListTemplate.opsForValue().set(
                token,
                email,
                getRemainMilliSeconds(token),
                TimeUnit.MILLISECONDS);
    }

    /**
     * 사용자 email, 만료 시간으로 토큰 생성
     *
     * @param email
     * @param expireTime
     * @return 생성된 토큰
     */
    private String generateToken(String email, long expireTime) {
        Claims claims = Jwts.claims();
        claims.put("email", email);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * accessToken 유효성 검증
     *
     * @param token
     * @return 유효 여부
     */
    public boolean validateToken(String token) {

        log.debug("JwtProvider::validateToken() called");

        try {
            log.debug("token: " + token);
            log.debug("getSigningKey(): " + getSigningKey());

            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            if (redisBlackListTemplate.hasKey(token)) {
                throw new AuthException(ErrorCode.NOT_VALID_TOKEN);
            }
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException |
                 IllegalArgumentException e) {
            throw new AuthException(ErrorCode.NOT_VALID_TOKEN);
        } catch (ExpiredJwtException e) {
            throw new AuthException(ErrorCode.EXPIRED_TOKEN);
        }
    }

    /**
     * refreshToken 유효성 검증
     *
     * @param refreshToken
     * @return 유효 여부
     */
    public Boolean validateRefreshToken(String refreshToken) {
        String email = extractEmail(refreshToken);
        String storedRefreshToken = redisTemplate.opsForValue().get(email);
        if (!Objects.equals(refreshToken, storedRefreshToken)) {
            throw new AuthException(ErrorCode.NOT_VALID_TOKEN);
        }
        return true;
    }

    /**
     * refreshToken 검증 이후 accessToken 재발급
     *
     * @param refreshToken
     * @return 재발급된 accessToken
     */
    public String reIssue(String refreshToken) {
        validateRefreshToken(refreshToken);
        return generateAccessToken(extractEmail(refreshToken));
    }

    /**
     * 토큰 만료까지 남은 시간
     *
     * @param token
     * @return 남은 시간
     */
    public long getRemainMilliSeconds(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        Date now = new Date();
        return expiration.getTime() - now.getTime();
    }

    public String removeBearer(String token) {
        if(token != null){
            if (token.startsWith("Bearer "))
                return token.substring(7);
        }

        return token;
    }

    /**
     * 로그아웃시 refresh 토큰 삭제
     *
     * @param email
     */
    public void deleteRefreshToken(String email) {
        redisTemplate.delete(email);
    }

}
