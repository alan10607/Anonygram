package com.alan10607.ag.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.List;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SimpleDTO {
    @NotNull(groups = IntegerGroup.class)
    Integer integer;

    @NotBlank(groups = StringGroup.class)
    String string;

    @NotNull(groups = ListGroup.class)
    List<?> list;

    public interface IntegerGroup extends Default {
    }

    public interface StringGroup extends Default {
    }

    public interface ListGroup extends Default {
    }
}
