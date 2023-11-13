package com.thank.domain.thank.service;

import com.thank.domain.thank.dto.request.AddThankNotesReq;
import com.thank.domain.thank.dto.response.FindThankNoteRes;
import com.thank.domain.thank.dto.response.FindThankNoteStatisticsRes;
import com.thank.domain.thank.entity.ThankNote;
import com.thank.domain.thank.repository.ThankNoteRepository;
import com.thank.global.exception.ErrorCode;
import com.thank.global.exception.ThankException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ThankNoteServiceImpl implements ThankNoteService{

    private final ThankNoteRepository thankNoteRepository;

    @Override
    public void addThankNotes(Long memberId, AddThankNotesReq addThankNotesReq) {
        LocalDate today = LocalDate.now();
        Optional<ThankNote> todayThankNote = thankNoteRepository.findByMemberIdAndCreateDt(memberId, today);

        if (todayThankNote.isPresent()){
            throw new ThankException(ErrorCode.THANK_NOTE_LENGTH_OVER);
        }

        LocalDate yesterday = today.minus(Period.ofDays(1));

        Optional<ThankNote> yesterdayThankNote = thankNoteRepository.findByMemberIdAndCreateDt(memberId, yesterday);

        int continueCnt = 1;
        if (yesterdayThankNote.isPresent()){
            continueCnt += yesterdayThankNote.get().getContinueCnt();
        }

        thankNoteRepository.save(ThankNote.builder()
                .memberId(memberId)
                .content(addThankNotesReq.getThankNotes())
                .continueCnt(continueCnt)
                .build());
    }

    @Override
    public List<LocalDate> findMonthlyThankNote(Long memberId, LocalDate date) {
        return thankNoteRepository.findCreateDtByCreateDt(memberId, date);
    }

    @Override
    public FindThankNoteRes findDailyThankNote(Long memberId, LocalDate date) {
        Optional<ThankNote> thankNote = thankNoteRepository.findByMemberIdAndCreateDt(memberId, date);

        if (thankNote.isEmpty()) {
            return FindThankNoteRes.builder().build();
        }

        return FindThankNoteRes.builder()
                .content(thankNote.get().getContent())
                .build();
    }

    @Override
    public FindThankNoteStatisticsRes findThankNoteStatistics(Long memberId) {
        int totalCnt = thankNoteRepository.countAllByMemberId(memberId);
        Optional<ThankNote> thankNote = thankNoteRepository.findDistinctByMemberIdAndCreateDt(memberId, LocalDate.now());
        int continueCnt = thankNote.map(ThankNote::getContinueCnt)
                .orElse(0);

        return FindThankNoteStatisticsRes.builder()
                .totalCnt(totalCnt)
                .continueCnt(continueCnt)
                .build();
    }

}
