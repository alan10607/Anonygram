package com.alan10607.ag.service.auth;

import com.alan10607.ag.constant.RoleType;
import com.alan10607.ag.dto.UserDTO;
import com.alan10607.ag.model.ForumUser;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Base64;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class AuthService {
    private final JwtService jwtService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final HttpSession session;

    public UserDTO login(UserDTO userDTO, HttpServletResponse response) {
        ForumUser user = (ForumUser) authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()))
                .getPrincipal();
        user.setPassword(null);
        userDTO = UserDTO.from(user);

        jwtService.setResponseJwtCookie(response, user);
        return userDTO;
    }

    public UserDTO anonymousLogin(HttpServletResponse response) {
        ForumUser user = userService.getTempAnonymousUser(getUUIDBase64());
        UserDTO userDTO = UserDTO.from(user);

        jwtService.setResponseJwtCookie(response, user);
        return userDTO;
    }

    public void register(UserDTO userDTO) {
        userService.create(userDTO, RoleType.NORMAL);
    }

    private String getUUIDBase64(){
        String tempId = UUID.randomUUID().toString();
        return Base64.getEncoder().encodeToString(hashTo6Bytes(tempId.getBytes()));
    }

    /**
     * If using this function, SessionCreationPolicy.STATELESS will not work
     * Get temp id by hashing session
     * @return
     */
    private String getSessionBase64(){
        String sessionId = session.getId();//HttpSession is thread safe
        return Base64.getEncoder().encodeToString(hashTo6Bytes(sessionId.getBytes()));
    }

    /**
     * XOR every 6 bytes in a loop, and encoding those 6 bytes with Base64 results in exactly 8 characters
     * @param bytes session bytes
     * @return hash id code
     */
    private byte[] hashTo6Bytes(byte[] bytes) {
        byte[] base64 = new byte[6];
        for(int i = 0; i < bytes.length; i++)
            base64[i % 6] ^= (bytes[i] & 0xFF);//& 0xFF: 只取8bits

        return base64;
    }

}