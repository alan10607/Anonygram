package com.ag.domain.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@SpringBootTest
@Slf4j
public class PrintController {

    @Autowired
    private RequestMappingHandlerMapping handlerMapping;

    @Test
    public void printPaths() {
        List<Pair<RequestMethod, String>> methodAndPaths = getControllerMethodAndPath();
        methodAndPaths.sort(Comparator.comparing((Pair<RequestMethod, String> pair) -> pair.getRight()).thenComparing(Pair::getLeft));
        String result = methodAndPaths.stream()
                .map(methodAndPath -> String.format("%s:%s", methodAndPath.getLeft().name(), methodAndPath.getRight()))
                .collect(Collectors.joining("\n"));

        log.info("Controller paths:\n" + result);
    }

    private List<Pair<RequestMethod, String>> getControllerMethodAndPath() {
        List<Pair<RequestMethod, String>> methodAndPaths = new ArrayList<>();
        Set<RequestMappingInfo> mappings = handlerMapping.getHandlerMethods().keySet();
        for (RequestMappingInfo mappingInfo : mappings) {
            Set<RequestMethod> methods = mappingInfo.getMethodsCondition().getMethods();
            Set<String> paths = mappingInfo.getPatternValues();
            for (RequestMethod method : methods) {
                for (String path : paths) {
                    methodAndPaths.add(Pair.of(method, path));
                }
            }
        }
        return methodAndPaths;
    }

}