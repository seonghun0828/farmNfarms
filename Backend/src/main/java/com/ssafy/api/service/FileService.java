package com.ssafy.api.service;

import com.ssafy.api.response.FileInfoRes;
import com.ssafy.domain.imgae.Image;
import com.ssafy.domain.imgae.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Service
public class FileService {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    ServletContext servletContext;

    //application.properties에 app.upload.dir을 정의하고, 없는 경우에는 default값으로 user.home
    private String uploadPath;

    //image를 받으면 1. server에 저장하고, 2. 저장정보를 db에 저장하고, 3. 저장 정보 중 id를 반환한다.
    public Long fileSave(MultipartFile file) {
        uploadPath = servletContext.getRealPath("/pictures");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String curDate = sdf.format(new Date());
        String ftype = file.getContentType();
        String newFileName = curDate + Long.toString(System.nanoTime());
        Path copyOfLocation = Paths.get(uploadPath + File.separator + newFileName);
         /*
        uploadPath : 기본 저장 경로
        File.separator :  프로그램이 실행 중인 OS에 해당하는 구분자를 리턴(win : \ mac : / )
        StringUtils.cleanPath : Normalize the path by suppressing sequences like "path/.." and inner simple dots. /나, . 떼어주는 역할

        */
        try{
            Files.copy(file.getInputStream(), copyOfLocation, StandardCopyOption.REPLACE_EXISTING);

            return imageRepository.save(Image.builder().
                    originFileName(file.getOriginalFilename()).
                    serverFileName(newFileName).
                    filePath(copyOfLocation.toString()).
                    fileSize(file.getSize()).
                    contentType(ftype)
                    .build()).getId();
        }
        catch(IOException e){
            e.printStackTrace();
            //throw new FileStorageException("Could not store file : " + file.getOriginalFilename());
        }
        return null;
    }

    public FileInfoRes fileUpload(Long idx){
        Image imgInfo = imageRepository.findById(idx).get();
        String filePath = imgInfo.getFilePath();
        String fileType = imgInfo.getContentType();

        return new FileInfoRes(filePath,fileType);

    }


}
