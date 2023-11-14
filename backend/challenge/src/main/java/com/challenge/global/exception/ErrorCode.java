package com.challenge.global.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

	// 자유 도전 에러
	CONTENT_LENGTH_OVER(400, "자유 도전 과제 글자수 초과"),
	CUSTOM_CHALLENGE_NOT_SAVED(404, "자유 도전 과제 등록 오류"),
	RANDOM_CHALLENGE_NOT_FOUND(400, "존재하지 않는 랜덤 도전 과제"),
	CATEGORY_NOT_FOUND(400, "존재하지 않는 인증 방식"),
	CUSTOM_CHALLENGE_SEARCH_ERROR(400, "도전 과제 검색 정렬 기준 오류"),
	CUSTOM_CHALLENGE_NOT_FOUND(404, "존재하지 않은 자유 도전 과제"),
	CUSTOM_MEMBER_NOT_MATCH(404, "사용자의 자유 도전 과제가 아님"),
	RANDOM_MEMBER_NOT_MATCH(404, "사용자의 랜덤 도전 과제가 아님"),

	PHOTO_CHALLENGE_NOT_FOUND(400, "존재하지 않는 사진 도전 과제"),
	PLACE_CHALLENGE_NOT_FOUND(400, "존재하지 않는 장소 도전 과제"),

	TODAY_COMMON_CHALLENGE_NOT_FOUND(400, "존재하지 않는 오늘의 공동 도전 과제"),
	DUPLICATE_COMMON_CHALLENGE(400, "이미 참여하고 있는 공동 도전 과제"),
	ATTEND_COMMON_CHALLENGE_NOT_FOUND(400, "참여한 공동 도전 과제 없음"),
	COMMON_CHALLENGE_ALREADY_COMPLETE(400, "이미 인증한 공동 도전 과제"),
	COMMON_CHALLENGE_NOT_COMPLETE(400, "아직 달성하지 못한 공동 도전 과제"),

	// JSON
	JSON_PARSE_ERROR(500, "JSON 파싱 에러"),

	// 신고
	ALREADY_REPORT_CHALLENGE(400, "이미 신고한 도전 과제"),

	// S3
	S3_IMAGE_LOAD_FAIl(500, "S3서버 이미지 업로드 실패"),

	// AI
	AI_CERT_FAIL(500, "AI 인증 중 오류"),

	// Quest
	QUEST_NOT_FOUND(404, "존재하지 않는 퀘스트"),
	QUEST_NOT_COMPLETE(400, "퀘스트 미달성"),
	REWARD_ALREADY_RECEIVED(400, "이미 수령한 보상"),

	// Asset
    MEMBER_ASSET_NOT_FOUND(404, "사용자 자산 정보 없음"),
	ASSET_NOT_FOUND(404, "해당 자산 정보 없음"),

	// setting
	SETTING_NOT_FOUND(404, "설정을 찾을 수 없습니다."),

	;

	private final int code;
	private final String message;

	ErrorCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

}
