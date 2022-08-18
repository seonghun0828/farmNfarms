package com.ssafy.domain.imgae;

import com.sun.org.apache.xalan.internal.xsltc.DOM;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Image {

    @Transient
    private String DOMAIN = "https://i7b203.p.ssafy.io/images/";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String originFileName;

    @Column
    private String serverFileName;

    @Column
    private String filePath;

    @Column
    private String contentType;

    @Column
    private long fileSize;

    public Image(String originFileName, String contentType, String serverFileName, String filePath, long fileSize) {
        this.originFileName = originFileName;
        this.serverFileName = serverFileName;
        this.contentType = contentType;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    public String getFullPath(){
       return DOMAIN + this.serverFileName;
    }
}
