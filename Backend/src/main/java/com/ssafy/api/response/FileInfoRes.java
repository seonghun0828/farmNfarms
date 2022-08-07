package com.ssafy.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FileInfoRes {

    String filePath;
    String fileType;

}
