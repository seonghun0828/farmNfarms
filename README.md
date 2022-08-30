# 👨‍🌾팜 앤 팜스(Farm N Farm's)

Web RTC를 활용한 비대면 농산물 경매 시스템

![로고](https://user-images.githubusercontent.com/93081720/185507555-0bfaa96a-77b4-49b1-b95e-4b54374877c6.png)

<br>

## 🚀프로젝트 소개

### 🏆🥇 대전 2반 최우수 프로젝트 수상 🥇🏆

🎉 SSAFY 7기 공통 프로젝트 대전 2반 최우수 프로젝트 수상

<br>

### 📆진행 일정

22.07.05(화) ~ 22.08.19(금) (총 7주)

#### 📅WBS

![image](https://user-images.githubusercontent.com/93081720/184662618-50326cad-3a85-4c8d-b612-fc3f26a6b5d8.png)

- Sub pjt1 - 기획; 프로젝트 아이디어 논의, 주제 구체화, 기능 요구 명세서 작성
- Sub pjt2 - 설계; ERD, 와이어프레임, 프로젝트 구조, 사용 기술 스택 선정
- Sub pjt3 - 개발; 기능 구현, 배포, 통합 테스트, UCC, 발표

<br>

### 🤝팀

| 🐸깨굴<br>(박시원)                                            | 🏇조조<br>(김성훈)                                            | 🐲무기<br>(이윤경)                                            | 🐱‍🏍히로<br>(김영웅)                                           | 🐳물통<br>(정태환)                                            | 🧞‍♂️지니<br>(허혜진)                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image](https://user-images.githubusercontent.com/93081720/185511603-bd7809a9-3440-4142-a1f0-a219618460d5.png) | ![image](https://user-images.githubusercontent.com/93081720/185511790-5c07ec10-1125-440e-b2c8-a33b69610d08.png) | ![image](https://user-images.githubusercontent.com/93081720/185511723-67fd412d-3947-45cf-bb4f-f27971830496.png) | ![image](https://user-images.githubusercontent.com/93081720/185511820-00618326-7e8f-4be6-a689-d7f829380234.png) | ![image](https://user-images.githubusercontent.com/93081720/185511838-73a12b30-846d-44fb-8fa9-55bb41a91671.png) | ![image](https://user-images.githubusercontent.com/93081720/185511857-3d5e191d-f5fd-4468-970a-301a1f0f94fe.png) |
| 팀장, 프론트,<br>Web RTC, <br>경매 프로세스                  | 팀원, 프론트,<br>프론트 리더, <br>프론트 아키텍쳐            | 팀원, 프론트,<br>디자인, UCC, <br> 농산물 시세               | 부팀장, 백엔드, <br>결제 시스템, DB 설계                     | 팀원, 백엔드, <br>인프라, 배포(CI/CD)                        | 팀원, 백엔드, <br>휴대폰 인증/알람, <br>REST API             |

<br>

### 🏁목표

주제, 기획의도에 충실한, 완성도 있는 프로젝트를 구현하여 무중단 배포까지 달성하기!!

<br>

### 🤔기획 의도

기존 농산물 경매 프로세스에 존재하는 도매 법인 - 경매 대인으로 인한 **비합리적인 경매 체계를 개선**하기 위해 비대면 농산물 경매 서비스 플랫폼을 도입하여 해당 문제를 해결하고자 하였음

#### 🎯서비스 대상

농산물 생산자 및 중도매인, 소매인, 소비자

#### 🎨 UI/UX

라이브 커머스를 이용하는 느낌을 받고, 모바일 화면인 만큼 SNS느낌과 가까운 방향으로 UI/UX를 구성하였음

#### ⚙ Technical

##### 🖼프론트엔드

Atomic 디자인 패턴 적용, One To Many Call 구현을 위한 OpenVidu 커스텀

##### 📡백엔드

NHN 휴대폰 인증/알림 API, KAMIS 농산물 시세 API, 카카오페이 결제 API 적용 

<br>

## 🛠기술 스택

![Image Pasted at 2022-8-16 17-21](https://user-images.githubusercontent.com/65841586/185304167-b9dbd554-65ef-4e7c-9f1e-8356f9f75dab.png)

- 세부내역
>구분|기술스택|상세내용|버전
>:--|:--|:--|:--
>공통|형상관리|GitLab|-
>&nbsp;|이슈관리|Jira|-
>&nbsp;|커뮤니케이션|Mattermost, Notion|-
>FrontEnd|HTML5|
>&nbsp;|CSS3|
>&nbsp;|JavaScript(ES6)|
>&nbsp;|styled-components||5.3.5
>&nbsp;|Material-UI||5.9.1
>&nbsp;|chartjs||4.3.1
>&nbsp;|React|React|18.2.0
>&nbsp;|&nbsp;|Redux|8.0.2
>&nbsp;|&nbsp;|Redux-Toolkit|1.8.3
>&nbsp;|IDE|Visual Studio Code|1.70.1
>BackEnd|Java|OpenJDK|11.0.16
>&nbsp;|Build|Gradle|4.10.2
>&nbsp;|Spring|Boot|2.1.7
>&nbsp;|&nbsp;|Security|2.1.7
>&nbsp;|API Docs|Swagger2|2.9.2
>&nbsp;|DB|Mysql|8.0.30
>&nbsp;|&nbsp;|Spring-Data-jpa|2.1.10
>&nbsp;|WebRTC|OpenVidu|2.21.1
>&nbsp;|IDE|IntelliJ|17.0.3
>Server|AWS EC2|GNU/Linux|5.4.0-1018
>&nbsp;|배포|Docker|20.10.17
>&nbsp;|&nbsp;|Jenkins|2.346.2
>&nbsp;|WebServer|Nginx|1.18.0

### 📬배포 방법
>- [[링크 참조](/exec/1_2_TechStack.md)]

<br>

## 💼기획/설계

### 📑기능 요구 명세서

페이지별로 구분하여 유저 스토리를 토대로 기능을 작성하고 기능 세부와 조건, 특이사항, 구현 우선순위, 담당자를 지정하였음

![image](https://user-images.githubusercontent.com/93081720/184662949-9076f24d-01ba-4495-bb0d-0c432ea78220.png)

<br>

### 💾ERD

![image](https://user-images.githubusercontent.com/93081720/184663336-4d6e5494-0c8c-491d-8430-aab31c9bf284.png)

<br>

### 🧩와이어프레임

피그마를 활용하여 작성함

처음 와이어프레임 기획단계에서는 웹 화면으로 구상하였으나, 피드백을 받고 모바일 화면으로 전환함

![image](https://user-images.githubusercontent.com/93081720/184663704-dade7c5f-7a03-4288-88d6-ee027886f9ac.png)

<br>

### 📈서비스 플로우 차트

![image](https://user-images.githubusercontent.com/93081720/184671450-2aafe5b8-12db-4c1f-9442-5e341f2f039a.png)

<br>

## 🛰프로젝트 관리/운영

### 🗂프로젝트 디렉토리

| 🖼프론트엔드                                                  | 📡백엔드                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="https://user-images.githubusercontent.com/93081720/185508854-f3cb5e85-8f6a-419c-a25a-0037c716f28d.png" referrerpolicy="no-referrer" alt="image"> | <img src="https://user-images.githubusercontent.com/93081720/185509201-53f148b1-66a3-43cf-b7b6-1401133b7aa8.png" referrerpolicy="no-referrer" alt="image"> |

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

#### 🧮경매

모든 사용자는 호스트의 화면만 보이며, 실수로 입찰을 눌러버리는 문제가 발생하지 않게 하기 위해 밀어서 입찰하는 버튼으로 구현하였음

![auction](https://user-images.githubusercontent.com/93081720/185510336-e564ed85-34cd-4c98-a6af-27c480e1d6c8.gif)

<br>

#### 💰결제

![payment](https://user-images.githubusercontent.com/93081720/185510662-767f7e99-e15e-4f0c-9d51-8fd31c50efff.gif)

<br>

#### 📊농산물 시세 조회

![pricesearch](https://user-images.githubusercontent.com/93081720/185509902-763b1de1-9541-4b15-b42d-9553daa4e8c0.gif)

<br>

### 🧪성능 테스트

#### 🩺TPS

서버의 안정성을 알아보기 위해 Jmeter를 통해 부하 테스트를 진행함(총 10회에 걸쳐 1초 동안 접속한 유저 700명이 해당 환경에서 요청하고 종료되는 테스트를 진행)

| 여러 페이지 동시 접속                                        | 메인 페이지만 접속                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image](https://user-images.githubusercontent.com/93081720/186888763-c90d8cc7-10ad-4f7f-8ff9-e7b22d1e0d33.png) | ![image](https://user-images.githubusercontent.com/93081720/186888781-a91cec24-ce45-443c-ba63-09146a7d2b2e.png) |

- 여러 페이지 동시 접속할 경우 TPS가 800에 그쳤음 => 병목이 많은 것 같아 다른 접속을 해제한 뒤, 메인 페이지에 대해 테스트
- 메인 페이지에 대한 요청만 남겨놓았을 경우 TPS가 최대 4000까지 나오는 것을 확인하였음
- 각 요청에 대한 서버의 반응 속도를 고려했을 때, **약 600명까지는 서버에서 안정적으로 수용 가능**하다는 결론을 내릴 수 있었음

<br>

## 😁프로젝트 회고

### 🐸깨굴
> 좋은 팀원을 만나서 즐겁게 프로젝트를 할 수 있었습니다.
개인적으로는 아쉬움이 남았지만, 팀이 하나가 되어 프로젝트를 잘 수행했기에 만족합니다.
관통 프로젝트에서와 마찬가지로 또 다른 성장 포인트를 찾은 것 같은 느낌이었습니다.
PMO 경험을 살려서 팀장 역할을 수행하면 잘 할 것이라 생각했지만, 여전히 배울 점이 많다는 것을 느꼈습니다. 팀원들이 잘 따라와주고 도와준 덕분에 팀이 잘 운영된 것 같습니다.
지난 7주 동안 열정적으로 함께 해준 우리가 자랑스럽고 다들 분명히 올해 바라는 목표를 달성할 수 있을 거야! 남은 과정도 열심히 해봅시다!! 화이팅!!!

<br>

### 🏇조조
> 실력, 인성 모두 좋은 팀원들과 찐하게 협업하며 프로젝트 해서 정말 재밌고 보람찼습니다! 성공적으로 프로젝트 마무리한 이 경험 잘 살려서 다들 취뽀합시다!!

<br>

### 🐲무기
> 길다고 생각했던 7주가 짧다고 느낀 시간이었습니다. 
처음 프로젝트를 시작했을 땐, 와 7주면 정말 엄청난 것을 만들 수 있겠다! 생각했지만,
실제로 기획부터 개발까지 진행해보니, 계획했던 대로 순탄히 흘러가기 보다는 중간에 엎어지는 일도 생긴다는 것을 깨달을 수 있었습니다. 그럼에도 불구하고 든든한 팀원들과 함께하면서 큰 불안함 없이 진행할 수 있었던 것 같습니다. 팀원들과 함께 프로젝트를 진행할 수 있어서 행복했고, 재밌었던 49일 이었습니다!

<br>

### 🐱‍🏍히로
> 제대로 된 협업을 경험해본 것 같습니다. 부족한 부분을 아직도 많이 느끼고 더 열심히 해야겠다는 생각이 들었습니다. 그래도 성장하는데 시너지가 되는 팀원을 만나서 너무 좋은 경험이었습니다. 힘들었지만, 재밌었고, 또 후회 없는 경험이었습니다. 다들 감사합니다!!

<br>

### 🐳물통
> 여럿이서 함께하는 프로젝트는 처음이었는데 역량좋고 적극적인 팀원들과 함께하여 구현 과정도 즐겁고 결과물도 만족스러워 행복했던 프로젝트였습니다

<br>

### 🧞‍♂️지니
> 이렇게 많은 인원과 역할분담을 제대로 해서 하는 협업 프로젝트는 처음이기 때문에 긴장도 되고 걱정도 많았는데, 너무 좋은 팀원들을 만나서 배울 점도 많았고 어려우면 서로 도와가며 진정한 협업을 경험해본 거 같아서 너무 좋았습니다!

<br>
