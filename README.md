### 기술스택
구분|기술스택|상세내용|버전
:--|:--|:--|:--
Server|AWS EC2|GNU/Linux|5.4.0-1018
&nbsp;|배포|Docker20.10.17
&nbsp;|&nbsp;|Jenkins|2.346.2
&nbsp;|WebServer|Nginx|1.18.0
공통|형상관리|GitLab|-
&nbsp;|이슈관리|Jira|-
&nbsp;|커뮤니케이션|Mattermost, Notion|-
BackEnd|DB|Mysql|8.0.30
&nbsp;|&nbsp;|Spring-Data-jpa|2.1.10
&nbsp;|Java|OpenJDK|11.0.16
&nbsp;|Spring|Boot|2.1.7
&nbsp;|&nbsp;|Security|2.1.7
&nbsp;|API Docs|Swagger2|2.9.2
&nbsp;|Build|Gradle|4.10.2
&nbsp;|IDE|IntelliJ|17.0.3
&nbsp;|WebRTC|OpenVidu|2.21.1
FrontEnd|HTML5|
&nbsp;|CSS3|
&nbsp;|JavaScript(ES6)|
&nbsp;|React|React|18.2.0
&nbsp;|&nbsp;|Redux|8.0.2
&nbsp;|&nbsp;|Redux-Toolkit|1.8.3
&nbsp;|styled-components||5.3.5
&nbsp;|Material-UI||5.9.1
&nbsp;|chartjs||4.3.1
&nbsp;|IDE|Visual Studio Code|1.70.1

### How To Run in Local environment
>- Frontend
>```
>npm install
>
>npm start
>```
>- Backend
>```
>gradlew build
>
>nohup java jar build/libs/Backend-1.0-SNAPSHOW.jar
>```

### How To Run in EC2
>- 개요
>>- 팜앤팜스 서비스는 Jenkins Pipeline 을 이용한 CI/CD 자동화 환경으로 구성되어 있어 팀 구성원 각자 작성한 코드를 Gitlab 에 푸쉬하면 Webhook 을 통해 Jenkins 에 Pipeline 작성한 대로 CI/CD 흐름이 진행됩니다
>>- MSA 로 아키텍처를 구성하여 Frontend 와 Backend 각각 다른 브랜치에서 개발하고 Pipeline 을 구분하여 배포 환경을 구성하였습니다
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

### Port Number
>각각의 구성요소는 모두 Docker container 로 격리
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
># 발급 확인
>cd /etc/letsencrypt/live/도메인/
>
>ls
>```