package fpt.g31.fsmis.service;

import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.repository.UserRepos;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepos userRepos;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        User user = userRepos.findByPhone(phone)
                .orElseThrow(() -> new UsernameNotFoundException("Phone '" + phone + "' not found"));
        return org.springframework.security.core.userdetails.User
                .withUsername(phone)
                .password(user.getPassword())
                .authorities(user.getRoles())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
