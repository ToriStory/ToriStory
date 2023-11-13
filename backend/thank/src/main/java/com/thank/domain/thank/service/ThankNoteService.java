package com.thank.domain.thank.service;

import com.thank.domain.thank.dto.request.AddThankNotesReq;
import com.thank.domain.thank.dto.response.FindThankNoteRes;
import com.thank.domain.thank.dto.response.FindThankNoteStatisticsRes;

import java.time.LocalDate;
import java.util.List;

public interface ThankNoteService {

    void addThankNotes(Long memberId, AddThankNotesReq addThankNotesReq);

    List<LocalDate> findMonthlyThankNote(Long memberId, LocalDate date);

    FindThankNoteRes findDailyThankNote(Long memberId, LocalDate date);

    FindThankNoteStatisticsRes findThankNoteStatistics(Long memberId);

}
