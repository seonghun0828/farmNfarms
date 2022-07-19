
package com.ssafy.domain.conference;

import com.ssafy.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Getter
@NoArgsConstructor
@Entity
public class Conference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "OWNER_ID")
    private User user;

    @Column
    private String title;

    @Column
    private String thumbnailUrl;

    @Column
    private String descrption;

    @Column
    private String address;
}

