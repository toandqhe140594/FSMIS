package fpt.g31.fsmis.exception;

public class FishingLocationNotFoundException extends RuntimeException {
    public FishingLocationNotFoundException(Long id) {
        super("Fishing location with id " + id + "not found");
    }
}
