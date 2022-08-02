
package com.ssafy.domain.XXXconference;

import com.ssafy.domain.user.User;
import lombok.Builder;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OWNER_ID")
    private User user;

    @Column
    private String title;

    @Column
    private String thumbnailUrl;

    @Column
    private String description;

    @Column
    private String address;

    @Builder
    public Conference(User user, String title, String thumbnailUrl, String description, String address) {
        this.user = user;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.description = description;
        this.address = address;
    }
}

