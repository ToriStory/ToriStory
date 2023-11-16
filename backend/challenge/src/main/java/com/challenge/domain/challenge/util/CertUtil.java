package com.challenge.domain.challenge.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.challenge.global.exception.ChallengeException;
import com.challenge.global.exception.ErrorCode;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CertUtil {


	 @Value("${flask.server.url}")
	private String flaskServerUrl;

	public String certAiUtil(MultipartFile image) {
		WebClient webClient = WebClient.create(flaskServerUrl);

		MultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();
		formData.add("image", image.getResource());

		try {
			String certAnswer = webClient.post()
				.uri("/ai/cert")
				.contentType(MediaType.MULTIPART_FORM_DATA)
				.body(BodyInserters.fromMultipartData(formData))
				.retrieve()
				.bodyToMono(String.class)
				.block();

			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(certAnswer);

			return jsonNode.get("result").asText();

		} catch (WebClientResponseException e) {
			throw new ChallengeException(ErrorCode.AI_CERT_FAIL);
		} catch (JsonMappingException e) {
			throw new RuntimeException(e);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}

}
