package fpt.g31.fsmis.exception.advice;

import fpt.g31.fsmis.exception.FishingLocationNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class FishingLocationNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(FishingLocationNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String userNotFoundHandler(FishingLocationNotFoundException ex) {
        return ex.getMessage();
    }
}
