package com.ssafy.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass//해당 클래스를 상속할 경우, 자동으로 상속되는 필드를 칼럼으로 인식하게한다.
@EntityListeners(AuditingEntityListener.class) // BaseTimeEntity 클래스에 Auditing 기능을 포함시킨다.
public class BaseTimeEntity {

    @CreatedDate //Entity가 생성되어 저장될 때 시간이 자동 저장.
    private LocalDateTime createdDate;

    @LastModifiedDate //조회한 Entity의 값 변경이 이뤄질 때 시간이 자동 저장.
    private LocalDateTime modifiedDate;

}
