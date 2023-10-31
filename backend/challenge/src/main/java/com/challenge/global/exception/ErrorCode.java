package com.challenge.global.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

	// 자유 도전 에러
	CONTENT_LENGTH_OVER(400, "자유 도전 과제 글자수 초과"),
	CUSTOM_CHALLENGE_NOT_SAVED(404, "자유 도전 과제 등록 오류"),
	RANDOM_CHALLENGE_NOT_FOUND(401, "존재하지 않는 랜덤 도전 과제"),
	CATEGORY_NOT_FOUND(401, "존재하지 않는 인증 방식"),
	CUSTOM_CHALLENGE_SEARCH_ERROR(400, "도전 과제 검색 정렬 기준 오류"),
	CUSTOM_CHALLENGE_NOT_FOUND(404, "존재하지 않은 자유 도전 과제"),
	CUSTOM_MEMBER_NOT_MATCH(404, "사용자의 자유 도전 과제가 아님"),
	RANDOM_MEMBER_NOT_MATCH(404, "사용자의 랜덤 도전 과제가 아님"),

	PHOTO_CHALLENGE_NOT_FOUND(401, "존재하지 않는 사진 도전 과제"),
	PLACE_CHALLENGE_NOT_FOUND(401, "존재하지 않는 장소 도전 과제"),

	// 신고
	ALREADY_REPORT_CHALLENGE(400, "이미 신고한 도전 과제"),

	// S3
	S3_IMAGE_LOAD_FAIl(500, "S3서버 이미지 업로드 실패"),

	// AI
	AI_CERT_FAIL(500, "AI 인증 중 오류"),

	;

	private final int code;
	private final String message;

	ErrorCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

}
