package fpt.g31.fsmis.security;

import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.exception.BannedException;
import fpt.g31.fsmis.repository.BannedPhoneRepos;
import fpt.g31.fsmis.repository.UserRepos;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ValidationException;
import java.io.IOException;

@Component
@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private JwtProvider jwtProvider;
    private UserDetailsService userDetailsService;

    private UserRepos userRepos;
    private BannedPhoneRepos bannedPhoneRepos;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = getJwtTokenFromRequest(request);

        if(StringUtils.hasText(token) && Boolean.TRUE.equals(jwtProvider.validateJwtToken(token))) {
            String phone = jwtProvider.getPhoneFromJwtToken(token);

            UserDetails userDetails = userDetailsService.loadUserByUsername(phone);
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    public String getJwtTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return bearerToken;
    }

    @SneakyThrows
    public User getUserFromToken(HttpServletRequest request) {
        String phone = jwtProvider.getPhoneFromJwtToken(getJwtTokenFromRequest(request));
        User user = userRepos.findByPhone(phone)
                .orElseThrow(() -> new ValidationException("Ng?????i d??ng kh??ng t???n t???i"));
        if (Boolean.TRUE.equals(user.getActive())) {
            return user;
        } else {
            BannedException bannedException = new BannedException();
            bannedException.setBannedPhone(bannedPhoneRepos.getById(phone));
            bannedException.setName(user.getFullName());
            throw bannedException;
        }
    }
}
