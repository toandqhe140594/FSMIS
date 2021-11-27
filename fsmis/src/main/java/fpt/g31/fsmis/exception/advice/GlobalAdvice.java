package fpt.g31.fsmis.exception.advice;

import com.twilio.exception.ApiException;
import fpt.g31.fsmis.dto.output.BanDetailDtoOut;
import fpt.g31.fsmis.dto.output.ResponseTextDtoOut;
import fpt.g31.fsmis.exception.BannedException;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.exception.UnauthorizedException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.validation.ValidationException;

@ControllerAdvice
public class GlobalAdvice {
    @ResponseBody
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    ResponseTextDtoOut globalExceptionHandler(Exception ex) {
        ex.printStackTrace();
        return new ResponseTextDtoOut("Lỗi server");
    }

    @ResponseBody
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    ResponseTextDtoOut notFoundExceptionHandler(NotFoundException ex) {
        ex.printStackTrace();
        return new ResponseTextDtoOut(ex.getMessage());
    }

    @ResponseBody
    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    ResponseTextDtoOut unauthorizedExceptionHandler(UnauthorizedException ex) {
        ex.printStackTrace();
        return new ResponseTextDtoOut(ex.getMessage());
    }

    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ResponseTextDtoOut methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex) {
        ex.printStackTrace();
        return new ResponseTextDtoOut("Thông tin truyền vào không hợp lệ");
    }

    @ResponseBody
    @ExceptionHandler(ApiException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ResponseTextDtoOut apiExceptionHandler(ApiException ex) {
        ex.printStackTrace();
        return new ResponseTextDtoOut(ex.getMessage());
    }

    @ResponseBody
    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ResponseTextDtoOut validationExceptionHandler(ValidationException ex) {
        ex.printStackTrace();
        return new ResponseTextDtoOut(ex.getMessage());
    }

    @ResponseBody
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    ResponseTextDtoOut usernameNotFoundExceptionHandler(BadCredentialsException ex) {
        ex.printStackTrace();
        return new ResponseTextDtoOut("Số điện thoại hoặc mật khẩu không đúng");
    }

    @ResponseBody
    @ExceptionHandler({MethodArgumentTypeMismatchException.class, MissingServletRequestParameterException.class, IllegalArgumentException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ResponseTextDtoOut methodArgumentTypeMismatchExceptionHandler(Exception ex) {
        ex.printStackTrace();
        return new ResponseTextDtoOut("Tham số truyền vào thiếu/sai định dạng");
    }

    @ResponseBody
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ResponseTextDtoOut httpRequestMethodNotSupportedExceptionHandler(HttpRequestMethodNotSupportedException ex) {
        ex.printStackTrace();
        return new ResponseTextDtoOut("Không hỗ trợ phương thức này cho request");
    }

    @ResponseBody
    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ResponseTextDtoOut httpMessageNotReadableExceptionHandler(HttpMessageNotReadableException ex) {
        ex.printStackTrace();
        return new ResponseTextDtoOut("Form điền thiếu thông tin");
    }

    @ResponseBody
    @ExceptionHandler({ExpiredJwtException.class, MalformedJwtException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    ResponseTextDtoOut jwtExceptionHandler(Exception ex) {
        ex.printStackTrace();
        return new ResponseTextDtoOut("Lỗi jwt");
    }

    @ResponseBody
    @ExceptionHandler(BannedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    BanDetailDtoOut bannedExceptionHandler(BannedException ex) {
        ex.printStackTrace();
        return BanDetailDtoOut.builder()
                .responseText("Tài khoản của bạn đã bị cấm")
                .description(ex.getBannedPhone().getDescription())
                .phone(ex.getBannedPhone().getPhone())
                .name(ex.getName())
                .image(ex.getBannedPhone().getImage())
                .error("BANNED")
                .build();
    }
}
