package fpt.g31.fsmis.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Không tìm thấy tài khoản có id " + id);
    }
}
