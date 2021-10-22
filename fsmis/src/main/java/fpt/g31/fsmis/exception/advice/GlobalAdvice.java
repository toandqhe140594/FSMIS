package fpt.g31.fsmis.exception.advice;

import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.exception.UnauthorizedException;
import javax.validation.ValidationException;
import com.twilio.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

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
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String notFoundExceptionHandler(NotFoundException ex) {
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

    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex) {
        ex.printStackTrace();
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(ApiException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String apiExceptionHandler(ApiException ex) {
        ex.printStackTrace();
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String validationExceptionHandler(ValidationException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    String usernameNotFoundExceptionHandler(BadCredentialsException ex) {
        return "Số điện thoại hoặc mật khẩu không đúng";
    }

    @ResponseBody
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String illegalArgumentExceptionHandler(IllegalArgumentException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String methodArgumentTypeMismatchExceptionHandler(MethodArgumentTypeMismatchException ex) {
        return "Địa chỉ không tồn tại";
    }

    @ResponseBody
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String httpRequestMethodNotSupportedExceptionHandler(HttpRequestMethodNotSupportedException ex) {
        return "Không hỗ trợ phương thức này cho API";
    }
}
