package com.alan10607.ag.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class ContLikeId implements Serializable {
    private String id;
    private Integer no;
    private String userId;
}