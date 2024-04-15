package com.ag.domain.util;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PojoFiledUtilTest {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class TestObject {
        private int id;
        private String name;
        private String title;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class TestObject2 {
        private int id;
        private String name;
        private int age;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class NoJsonIgnoreObject {
        private int id;
        private String name;
        private int age;
    }

    @Test
    void overwritePublicFields() {
        // Arrange
        TestObject target = new TestObject(10, null, "title");
        TestObject source = new TestObject(20, "newValue", null);

        // Act
        PojoFiledUtil.overwriteFields(target, source);

        // Assert
        assertEquals(20, target.id);
        assertEquals("newValue", target.name);
        assertEquals("title", target.title);
    }

    @Test
    void retainFields() {
        // Arrange
        TestObject originalObject = new TestObject(1, "OriginalName", "title");

        // Act
        TestObject retainedObject = PojoFiledUtil.retainFields(originalObject, "title");

        // Assert
        assertNotNull(retainedObject);
        assertEquals(0, retainedObject.getId());
        assertNull(retainedObject.getName());
        assertEquals("title", retainedObject.getTitle());
    }

    @Test
    public void convertObject_if_convert_primitive_data_types() {
        // Arrange
        TestObject original = new TestObject(1, "Alan", "Engineer");

        // Act
        TestObject2 converted = PojoFiledUtil.convertObject(original, TestObject2.class);

        // Assert
        assertEquals(original.getId(), converted.getId());
        assertEquals(original.getName(), converted.getName());
        assertEquals(0, converted.getAge());
    }

    @Test
    public void convertObject_if_convert_object() {
        // Arrange
        TestObject2 original = new TestObject2(1, "Alan", 18);

        // Act
        TestObject converted = PojoFiledUtil.convertObject(original, TestObject.class);

        // Assert
        assertEquals(original.getId(), converted.getId());
        assertEquals(original.getName(), converted.getName());
        assertNull(converted.getTitle());
    }

    @Test
    public void convertObject_if_convert_NoJsonIgnoreObject() {
        // Arrange
        TestObject original = new TestObject(1, "Alan", "Engineer");

        // Act & Assert
        assertThrows(Exception.class, () -> PojoFiledUtil.convertObject(original, NoJsonIgnoreObject.class));
    }

}
