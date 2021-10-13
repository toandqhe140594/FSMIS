package fpt.g31.fsmis.exception.advice;

import fpt.g31.fsmis.exception.FishingLocationNotFoundException;
import fpt.g31.fsmis.exception.UnauthorizedException;
import fpt.g31.fsmis.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalAdvice {
    @ResponseBody
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    String globalExceptionHandler(Exception ex) {
        ex.printStackTrace();
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(FishingLocationNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String fishingLocationNotFoundExceptionHandler(FishingLocationNotFoundException ex) {
        ex.printStackTrace();
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String userNotFoundExceptionHandler(UserNotFoundException ex) {
        ex.printStackTrace();
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    String unauthorizedExceptionHandler(UnauthorizedException ex) {
        ex.printStackTrace();
        return ex.getMessage();
    }
}