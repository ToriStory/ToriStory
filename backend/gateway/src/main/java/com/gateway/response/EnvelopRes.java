package com.gateway.response;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class EnvelopRes<T> {

    @Builder.Default
    private int code = 200;

    @Builder.Default
    private String message = "success";

    private T data;

}
