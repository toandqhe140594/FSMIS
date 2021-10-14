package fpt.g31.fsmis.exception;

public class FishingLocationNotFoundException extends RuntimeException {
    public FishingLocationNotFoundException(Long id) {
        super("Không tìm thấy hồ câu với id " + id);
    }
}
