package com.alan10607.ag.model;

import com.alan10607.ag.constant.StatusType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ContentId.class)
public class Content {

    @Id
    private String id;

    @Id
    private Integer no;

    @Column(nullable = false)
    private String authorId;

    @Column(nullable = false, columnDefinition="TEXT")
    private String word;

    @Column(nullable = false)
    private Long likes;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusType status;

    @Column(nullable = false)
    private LocalDateTime createDate;

    @Column(nullable = false)
    private LocalDateTime updateDate;

}