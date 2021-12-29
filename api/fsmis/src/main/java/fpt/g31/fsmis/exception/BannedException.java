package fpt.g31.fsmis.exception;

import fpt.g31.fsmis.entity.BannedPhone;

public class BannedException extends Exception {
    private BannedPhone bannedPhone;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BannedPhone getBannedPhone() {
        return bannedPhone;
    }

    public void setBannedPhone(BannedPhone bannedPhone) {
        this.bannedPhone = bannedPhone;
    }
}
