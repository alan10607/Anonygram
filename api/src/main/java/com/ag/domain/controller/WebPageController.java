package com.ag.domain.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping()
@AllArgsConstructor
public class WebPageController {

    @RequestMapping("/index")
    public String index() {
        return "index.html";
    }

    @RequestMapping("/err")
    public String error(HttpServletResponse response, Model model) {
        model.addAttribute("status", response.getStatus());
        return "err.html";
    }

    /**
     * Use this to test ssl for front-end.
     * Redirect to the url specified by "callbackUrl" parameter.
     *
     * @return redirect page
     */
    @GetMapping("/ssl")
    public String ssl() {
        return "ssl.html";
    }

    /**
     * Use this redirect to parse url hash parameters.
     * Need 'to' parameter in url to define the redirected url.
     * Ex: https://localhost/redirect?to=/imgur/saveToken#access_token=abc
     * will direct to https://localhost/imgur/saveToken?access_token=abc
     *
     * @return redirect page
     */
    @GetMapping("/redirect")
    public String redirectHashToParameter() {
        return "redirect.html";
    }

}