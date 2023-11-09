package com.challenge.domain.quest.model;

import com.challenge.global.exception.ChallengeException;
import com.challenge.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum QuestEnum {
    QUEST_1((byte) 1, "공동 도전과제 참여하기"),
    QUEST_2((byte) 2, "자유 도전과제 1개 생성하기"),
    QUEST_3((byte) 3, "자유 도전과제 3개 성공하기"),
    QUEST_4((byte) 4, "자유 도전과제 1개 가져오기"),
    QUEST_5((byte) 5, "여우에게 밥 주기");

    private final byte questId;
    private final String questTitle;

    QuestEnum(byte questId, String questTitle) {
        this.questId = questId;
        this.questTitle = questTitle;
    }

    // 아래의 메서드를 사용하여 questId에 해당하는 QuestEnum을 찾을 수 있습니다.
    public static QuestEnum findByQuestId(byte questId) {
        for (QuestEnum quest : values()) {
            if (quest.questId == questId) {
                return quest;
            }
        }
        // 매치되는 값이 없는 경우 예외 처리
        throw new ChallengeException(ErrorCode.QUEST_NOT_FOUND);
    }

}
