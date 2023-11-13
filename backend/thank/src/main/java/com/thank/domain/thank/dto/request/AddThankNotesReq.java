package com.thank.domain.thank.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AddThankNotesReq {

    @NotBlank
    private String thankNotes;

}

