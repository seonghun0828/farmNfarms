### Port Number
>각각의 구성요소는 Docker container 로 격리하였습니다
>Port|이름
>:--|:--
>80|HTTP => 443(HTTPS)로 리다이렉트
>443|HTTPS
>3000|React, Nginx Docker Container
>3306|Mysql Docker Container
>8443|Openvidu Docker Container
>9000|SpringBoot Docker Container
>9999|Jenkins Docker Container

### ssl 인증서 발급
>- nginx 설치
>```
>sudo apt-get install nginx
>```
>- letsencrypt 설치
>```
>sudo apt-get install letsencrypt
>
>sudo systemctl stop nginx
>
>sudo letsencrypt certonly --standalone -d 도메인
>
># 발급 경로
>cd /etc/letsencrypt/live/도메인/
># 발급 확인
>ls
>```

### 문자 알림 설정
>- NHN Cloud 의 Toast appkey 와 secretkey 를 application.API-KEY.properties 에 입력합니다

### How To Run in Local
>- Frontend
>```
>npm install
>
>npm start
>```
>- Backend
>>- 사용하는 IDE 로 import 후 src/main/java/com/ssafy/Application.java 실행

### How To Run in EC2
>- 개요
>>- 팜앤팜스 서비스는 Jenkins 를 이용한 CI/CD 자동화 환경으로 구성하여 팀 구성원 각자 작성한 코드를 Gitlab 에 푸쉬하면 Webhook 을 통해 Jenkins 의 Pipeline Script 에 작성한 대로 CI/CD 흐름이 진행됩니다
>>- MSA 로 아키텍처를 구성하여 Frontend 와 Backend 각각 다른 브랜치에서 개발하고 Pipeline 을 구분하여 배포 환경을 구성하였습니다
>- EC2 배포 환경 구성 순서
>>1. ufw (uncomplicated firewall) 방화벽 포트 개방
>>2. Openvidu 설치, 설정, Openvidu ssl 발급
>>3. 도커 설치
>>4. Jenkins 도커 이미지 설치 및 컨테이너 실행 및 설정
>>5. Mysql 도커 이미지 설치 및 컨테이너 실행 및 설정
>>6. frontend 폴더의 Dockerfile 을 이용하여 도커 이미지 생성 및 컨테이너 실행
>>7. backend 폴더의 Dockerfile 을 이용하여 도커 이미지 생성 및 컨테이너 실행
>>8. Nginx 설치 및 설정
>- ufw  (uncomplicated firewall) 방화벽 포트 개방
>```
># ufw 명령 도움말
>sudo ufw -help
>
># ufw 상태 확인
>sudo ufw status
>
># ufw 포트 허용
>sudo ufw allow portnumber
>```
>- Openvidu 설치, 설정, Openvidu ssl 발급
>>- https://docs.openvidu.io/en/stable/deployment/ce/on-premises/ 공식 문서를 참고하여 진행하는것을 추천함
>- Jenkins 도커 이미지 설치 및 컨테이너 실행 및 설정
>```
># jenkins 이미지 가져오기
>docker pull jenkins/jenkins:lts
>
># jenkins 컨테이너 실행
>docker run -d --name jenkins [옵션은 자유롭게]
>```
>- Mysql 도커 이미지 설치 및 컨테이너 실행 및 설정
>```
># mysql 이미지 가져오기
>docker pull mysql
>
># mysql 컨테이너 실행
>docker run -d -p 3306:3306 mysql [옵션은 자유롭게]
>```
>- frontend 폴더의 Dockerfile 을 이용하여 도커 이미지 생성 및 컨테이너 실행
>```
># git repo 가져오기
>git pull [주소]
>
># React 빌드
>npm install -g yarn
>yarn install
>yarn build
>
># Docker 이미지 생성
>docker build [이미지 이름]
>
># Docker Container 실행
>docker run -d [이미지 이름]
>```
>- backend 폴더의 Dockerfile 을 이용하여 도커 이미지 생성 및 컨테이너 실행
>```
># git repo 가져오기
>git pull [주소]
>
># SpringBoot 빌드
>gradlew build
>
># SpringBoot 이미지 생성
>docker build [이미지 이름]
>
># Docker Container 실행
>docker run -d [이미지 이름]
>```
>- Nginx 설치 및 설정
>```
># Nginx 설치
>sudo apt-get install nginx
>``` 
>- ec2 nginx
>```conf
># /etc/nginx/sites-available/default
>server {
>	listen 80 default_server;
>	listen [::]:80 default_server;
>
>	server_name i7b203.p.ssafy.io;
>
>	location /api {
>		return 301 https://$server_name:9000/swagger-ui.html;
>	}
>
>	location / {
>		proxy_pass https://localhost:3000;
>	}
>
>}
>
>server {
>	listen 443 ssl;
>	server_name i7b203.p.ssafy.io;
>	ssl_certificate		/etc/letsencrypt/live/i7b203.p.ssafy.io/cert.pem;
>	ssl_certificate_key	/etc/letsencrypt/live/i7b203.p.ssafy.io/privkey.pem;
>	
>	location /api {
>		return 301 https://$server_name:9000/swagger-ui.html;
>	}
>
>	location /images {
>		alias /var/lib/image;
>	}
>
>	location / {
>		proxy_pass https://localhost:3000;
>	}
>}
>```
>- jenkins frontend pipeline
>```
>pipeline {
>  agent any
>  
>  environment {
>    GIT_URL = "https://lab.ssafy.com/s07-webmobile1-sub2/S07P12B203.git"
>  }
>  
>  tools {
>    nodejs "nodejs-client"
>  }
>  
>  stages {
>    stage('Pull') {
>      steps {
>        script {
>          git url: "${GIT_URL}", branch: "develop/frontend", credentialsId: 'b030b717-70cb-400d-be6e-1bdcf5550543', poll: true, changelog: true
>        }
>      }
>    }
>    
>    stage('React Build') {
>      steps {
>        script {
>          sh 'npm install -g yarn'
>          sh 'yarn --cwd ./frontend install --network-timeout 100000'
>          sh 'yarn --cwd ./frontend build'
>        }
>      }
>    }
>    
>    stage('Build') {
>      steps {
>        script {
>          sh 'docker build -t basepage/nginx ./frontend/'
>        }
>      }
>    }
>    
>    stage('Deploy') {
>      steps {
>        script {
>          sh 'docker stop nginx && docker rm nginx'
>          sh 'docker run -d --name nginx -p 3000:443 -v /etc/letsencrypt/archive:/etc/letsencrypt/archive -u root basepage/nginx'
>        }
>      }
>    }
>    
>    stage('Finish') {
>      steps {
>        script {
>          sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
>        }
>      }
>    }
>  }
>}
>```
>- jenkins backend pipeline
>```pipeline
>pipeline {
>  agent any
>  
>  environment {
>    GIT_URL = "https://lab.ssafy.com/s07-webmobile1-sub2/S07P12B203.git"
>  }
>  
>  tools {
>    gradle "gradle-api"
>  }
>  
>  stages {
>    stage('Pull') {
>      steps {
>        script {
>          git url: "${GIT_URL}", branch: "develop/backend", credentialsId: 'b030b717-70cb-400d-be6e-1bdcf5550543', poll: true, changelog: true
>        }
>      }
>    }
>    
>    stage('SpringBoot Build') {
>      steps {
>        script {
>          dir('Backend') {
>              sh './gradlew build'
>          }
>        }
>      }
>    }
>    
>    stage('Build') {
>      steps {
>        script {
>          sh 'docker build -t springboot ./Backend/'
>        }
>      }
>    }
>    
>    stage('Deploy') {
>      steps {
>        script {
>          sh 'docker stop springboot && docker rm springboot'
>          sh 'docker run -d -v /var/lib/image:/root/pictures -v /etc/timezone:/etc/timezone -v /etc/localtime:/etc/localtime --name springboot -p 9000:8080 -u root springboot'
>        }
>      }
>    }
>    
>    stage('Finish') {
>      steps {
>        script {
>          sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
>        }
>      }
>    }
>  }
>}
>```
>- Frontend
>>- DockerFile
>>```Dockerfile
>>## Dockerfile(client)
>>
>>FROM nginx
>>WORKDIR /home/ubuntu/S07P12B203/frontend
>>RUN mkdir ./build
>>ADD ./build ./build
>>RUN rm /etc/nginx/conf.d/default.conf
>>COPY ./nginx.conf /etc/nginx/conf.d
>>EXPOSE 443
>>CMD ["nginx", "-g", "daemon off;"]
>>```
>>- nginx.conf
>>```conf
>>server {
>>    listen 443 ssl;
>>    server_name i7b203.p.ssafy.io;
>>
>>    ssl_certificate /etc/letsencrypt/archive/i7b203.p.ssafy.io/fullchain1.pem;
>>    ssl_certificate_key /etc/letsencrypt/archive/i7b203.p.ssafy.io/privkey1.pem;
>>
>>    location / {
>>        root /home/ubuntu/S07P12B203/frontend/build;
>>        index index.html index.htm;
>>        try_files $uri $uri/ /index.html;
>>    }
>>}
>>```
>- Backend DockerFile
>>- DockerFile
>>```Dockerfile
>>FROM    openjdk:8-jdk-alpine
>>ARG     JAR_FILE=build/libs/*.jar
>>COPY    ${JAR_FILE} app.jar
>>ENTRYPOINT ["java", "-jar", "/app.jar"]
>>```