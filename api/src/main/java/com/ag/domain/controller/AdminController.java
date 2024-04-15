package com.ag.domain.controller;

import com.ag.domain.service.ImgurService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;

@RestController
@AllArgsConstructor
@Tag(name = "Admin Setting")
@RequestMapping(path = "admin")
public class AdminController {
    private final ImgurService imgurService;

    @GetMapping("/imgur/token")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Redirect to Imgur authorization URL")
    public RedirectView redirectImgurAuthorizationUrl() {
        return new RedirectView(imgurService.getAuthorizationUrl());
    }

    @PutMapping("/imgur/token")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Refresh token of Imgur authorization")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> imgurRefreshToken() {
        return imgurService.refreshToken();
    }

    /**
     * Need to set Imgur's redirect as https://localhost/redirect?to=/admin/imgur/saveToken
     *
     * @return tokens
     */
    @GetMapping("/imgur/saveToken")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Save token of Imgur authorization, used by Imgur redirect")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> imgurSaveToken(@RequestParam("access_token") String accessToken,
                                              @RequestParam("refresh_token") String refreshToken) {
        return imgurService.saveToken(accessToken, refreshToken);
    }

}