package fpt.g31.fsmis.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ROLE_ADMIN, ROLE_STAFF, ROLE_OWNER, ROLE_ANGLER;

    @Override
    public String getAuthority() {
        return name();
    }
}
