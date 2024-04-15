package com.alan10607.ag.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TxnParam {

    @Id
    private String param;

    @Column(nullable = false)
    private String value;

    @Column(nullable = false)
    private LocalDateTime updateDate;
}