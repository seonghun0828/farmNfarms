# 👨‍🌾팜 앤 팜스(Farm N Farm's)

로고 넣기

Web RTC를 활용한 비대면 농산물 경매 시스템

<br>

## 🚀프로젝트 소개

### 📆진행 일정

22.07.05(화) ~ 22.08.19(금) (총 7주)

#### 📅WBS

![image](https://user-images.githubusercontent.com/93081720/184662618-50326cad-3a85-4c8d-b612-fc3f26a6b5d8.png)

- Sub pjt1 - 기획; 프로젝트 아이디어 논의, 주제 구체화, 기능 요구 명세서 작성
- Sub pjt2 - 설계; ERD, 와이어프레임, 프로젝트 구조, 사용 기술 스택 선정
- Sub pjt3 - 개발; 기능 구현, 배포, 통합 테스트, UCC

<br>

### 🤝팀

| 🐸깨굴<br>(박시원)                           | 🏇조조<br>(김성훈)                                 | 🐲무기<br>(이윤경)                              | 🐱‍🏍히로<br>(김영웅)                       | 🐳물통<br>(정태환)                     | 🧞‍♂️지니<br>(허혜진)                        |
| ------------------------------------------- | ------------------------------------------------- | ---------------------------------------------- | ---------------------------------------- | ------------------------------------- | ----------------------------------------- |
|                                             |                                                   |                                                |                                          |                                       |                                           |
| 팀장, 프론트,<br>Web RTC, <br>경매 프로세스 | 팀원, 프론트,<br>프론트 리더, <br>프론트 아키텍쳐 | 팀원, 프론트,<br>디자인, UCC, <br> 농산물 시세 | 부팀장, 백엔드, <br>결제 시스템, DB 설계 | 팀원, 백엔드, <br>인프라, 배포(CI/CD) | 팀원, 백엔드, <br>문자 인증, <br>REST API |

<br>

### 🎯목표

<br>

### 🤔기획 의도

기존 농산물 경매 프로세스에 존재하는 도매 법인 - 경매 대인으로 인한 **비합리적인 경매 체계를 개선**하기 위한 비대면 농산물 경매 서비스 플랫폼 도입

<br>

## 🛠기술 스택

![Image Pasted at 2022-8-14 22-33](https://user-images.githubusercontent.com/93081720/184661803-872e1d18-fe2a-40ca-b3a3-2c48d9ab6877.png)

- 세부내역
>구분|기술스택|상세내용|버전
>:--|:--|:--|:--
>Server|AWS EC2|GNU/Linux|5.4.0-1018
>&nbsp;|배포|Docker20.10.17
>&nbsp;|&nbsp;|Jenkins|2.346.2
>&nbsp;|WebServer|Nginx|1.18.0
>공통|형상관리|GitLab|-
>&nbsp;|이슈관리|Jira|-
>&nbsp;|커뮤니케이션|Mattermost, Notion|-
>BackEnd|DB|Mysql|8.0.30
>&nbsp;|&nbsp;|Spring-Data-jpa|2.1.10
>&nbsp;|Java|OpenJDK|11.0.16
>&nbsp;|Spring|Boot|2.1.7
>&nbsp;|&nbsp;|Security|2.1.7
>&nbsp;|API Docs|Swagger2|2.9.2
>&nbsp;|Build|Gradle|4.10.2
>&nbsp;|IDE|IntelliJ|17.0.3
>&nbsp;|WebRTC|OpenVidu|2.21.1
>FrontEnd|HTML5|
>&nbsp;|CSS3|
>&nbsp;|JavaScript(ES6)|
>&nbsp;|React|React|18.2.0
>&nbsp;|&nbsp;|Redux|8.0.2
>&nbsp;|&nbsp;|Redux-Toolkit|1.8.3
>&nbsp;|styled-components||5.3.5
>&nbsp;|Material-UI||5.9.1
>&nbsp;|chartjs||4.3.1
>&nbsp;|IDE|Visual Studio Code|1.70.1

### 배포 방법
>- [[링크 참조](/exec/TechStack.md)]

<br>

## 💼기획/설계

### 📑기능 요구 명세서

페이지별로 구분하여 유저 스토리를 토대로 기능을 작성하고 기능 세부와 조건, 특이사항, 구현 우선순위, 담당자를 지정하였음

![image](https://user-images.githubusercontent.com/93081720/184662949-9076f24d-01ba-4495-bb0d-0c432ea78220.png)

<br>

### 💾ERD

![image](https://user-images.githubusercontent.com/93081720/184663336-4d6e5494-0c8c-491d-8430-aab31c9bf284.png)

<br>

### 🖼와이어프레임

피그마를 활용하여 작성함

처음 와이어프레임 기획단계에서는 웹 화면으로 구상하였으나, 피드백을 받고 모바일 화면으로 전환함

![image](https://user-images.githubusercontent.com/93081720/184663704-dade7c5f-7a03-4288-88d6-ee027886f9ac.png)

<br>

### 📈서비스 플로우 차트

![image](https://user-images.githubusercontent.com/93081720/184671450-2aafe5b8-12db-4c1f-9442-5e341f2f039a.png)

<br>

## 🛰프로젝트 관리/운영

### 🗂프로젝트 디렉토리

<br>

### 📢Jira

![image](https://user-images.githubusercontent.com/93081720/184665725-703c3431-3ab6-4c4a-8f3b-c17daa6f3094.png)

<br>

### 🧾Notion

![image](https://user-images.githubusercontent.com/93081720/184668727-6f8e19ae-c1d9-4822-9094-f4dcbec03945.png)

<br>

### 🙋‍♀️데일리 스크럼

![image](https://user-images.githubusercontent.com/93081720/184668990-4d085d74-e8fa-41d6-9fc5-10af73cb4873.png)

![image](https://user-images.githubusercontent.com/93081720/184669110-87f720dd-f84f-4ac2-a3bd-5e0d042a3fe2.png)

<br>

### 🔍코드 리뷰

![화면 캡처 2022-08-11 171507](https://user-images.githubusercontent.com/93081720/184671730-f7bab796-9ac8-46fd-8d7e-755aed7d3dff.png)

<br>

## 📱서비스 구현 내용

### 🕹주요 기능

#### 경매

<br>

#### 결제

<br>

#### 농산물 시세 조회

<br>

## 😁프로젝트 회고

### ☝느낀점 & 배운점

#### 🐸깨굴

<br>

#### 🏇조조

<br>

#### 🐲무기

<br>

#### 🐱‍🏍히로

<br>

#### 🐳물통

<br>

#### 🧞‍♂️지니

<br>
