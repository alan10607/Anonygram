package com.ag.domain.controller;

import com.ag.domain.dto.UserDTO;
import com.ag.domain.model.ForumUser;
import com.ag.domain.service.UserService;
import com.ag.domain.util.PojoFiledUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@Tag(name = "User")
@RequestMapping(path = "user")
public class UserController {
    private final UserService userService;

    @GetMapping("/{userId}")
    @Operation(summary = "Get a user")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO get(@PathVariable("userId") String userId) {
        return outputFilter(userService.get(userId));
    }

    @PostMapping()
    @Operation(summary = "To register user")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO create(@RequestBody UserDTO userDTO) {
        ForumUser user = PojoFiledUtil.convertObject(userDTO, ForumUser.class);
        return outputFilter(userService.create(user));
    }

    @PatchMapping("/{userId}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "To patch a user")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void patch(@PathVariable("userId") String userId,
                      @RequestBody UserDTO userDTO) {
        ForumUser user = PojoFiledUtil.convertObject(userDTO, ForumUser.class);
        user.setId(userId);
        userService.patch(user);
    }

    private UserDTO outputFilter(ForumUser user) {
        if (user == null) {
            return null;
        } else {
            UserDTO userDTO = PojoFiledUtil.convertObject(user, UserDTO.class);
            userDTO.setPassword(null);
            return userDTO;
        }
    }

}