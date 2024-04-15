package com.alan10607.ag.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ContLikeId.class)
public class ContLike {

    @Id
    private String id;

    @Id
    private Integer no;

    @Id
    private String userId;

}