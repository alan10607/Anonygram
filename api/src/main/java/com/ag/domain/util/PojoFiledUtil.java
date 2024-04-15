package com.ag.domain.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;

public class PojoFiledUtil {

    public static void overwriteFields(Object target, Object source) {
        if (!target.getClass().equals(source.getClass())) {
            throw new IllegalArgumentException("Objects must be of the same type");
        }

        try {
            for (Field field : target.getClass().getDeclaredFields()) {
                if (Modifier.isStatic(field.getModifiers()) || Modifier.isFinal(field.getModifiers())) {
                    return;
                }

                field.setAccessible(true);
                Object newValue = field.get(source);
                if (newValue != null) {
                    field.set(target, newValue);
                }
            }
        } catch (IllegalAccessException e) {
            throw new RuntimeException("Error while overwriting fields", e);
        }
    }

    public static <T> T retainFields(T pojo, String... retainFields) {
        try {
            Class<?> clazz = pojo.getClass();
            Constructor<?> constructor = clazz.getConstructor();
            T newPojo = (T) (constructor.newInstance());

            for (String retainField : retainFields) {
                Field field = clazz.getDeclaredField(retainField);
                field.setAccessible(true);
                field.set(newPojo, field.get(pojo));
            }
            return newPojo;
        } catch (NoSuchFieldException | InvocationTargetException | NoSuchMethodException | InstantiationException | IllegalAccessException e) {
            throw new RuntimeException("Failed to retain POJO fields", e);
        }
    }

    public static <T> T convertObject(Object fromValue, Class<T> toClass) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper.convertValue(fromValue, toClass);
    }
}

