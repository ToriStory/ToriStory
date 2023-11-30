## 목차

1. [서비스 소개](#-서비스-소개)
2. [주요 기능](#-주요-기능)
3. [시스템 아키텍처](#-시스템-아키텍처)
4. [협업 툴](#-협업-툴)
5. [기술 스택](#%EF%B8%8F-기술-스택)<br/>
   5.1 [프론트엔드](#--프론트엔드-)<br/>
   5.2 [백엔드](#--백엔드-)<br/>
   5.3 [인프라](#--인프라-)<br/>
6. [팀원 소개](#-팀원-소개)

## 🍂 서비스 소개

| **소소하지만 확실한 행복을 주는 우리들의 이야기, 토리스토리!**

‘토리스토리’는 우울감을 느끼는 20대를 대상으로 소소한 도전 과제 달성을 통해 성취감 및 자존감을 높이는 것을 목표로 하는 서비스입니다.

<div markdown="1">
    <img src="https://github.com/ToriStory/ToriStory/assets/56223389/08e8208b-c701-474a-96f9-edf6cbbdbce8" width='100%'/>
</div>
<div markdown="1">
    <img src="https://github.com/ToriStory/ToriStory/assets/56223389/49e0afa5-491e-432d-b2e1-2e72e0aecc6f" width='100%'/>
</div>

## 🍁 주요 기능

### 1. 도전 과제

👨‍👧‍👦 <b>공동 도전</b>

- 모두 참여하는 하나의 과제로, **소속감**을 느낄 수 있습니다.
- 공동 도전에 참여하여 사진을 공유하고 다른 사람이 올린 사진을 구경할 수 있습니다.
- 완료한 참가자 수가 증가할 수록 더 많은 도토리를 얻을 수 있습니다. 

    <b> | 공동도전 참여 & 사진 공유 </b>
    <!-- 공동 도전 사진 공유 -->
    <img src="https://github.com/chaejeong-lee/chaejeong-lee/assets/112626357/d8a339ea-538d-4bdc-8c4f-51f4c3f3dabe" width="200"/>

🎲 <b>랜덤 도전</b> 

- 사진 또는 장소 인증이 필요한 랜덤한 과제로, **성취감**을 느낄 수 있습니다.
- 시스템에서 성공 여부를 판별함으로써 기능에 대한 흥미를 유발하고 인정 받는 느낌을 강화했습니다.
- 완료한 참가자 수가 증가할 수록 더 많은 도토리를 얻을 수 있습니다. 
- 랜덤 도전 갱신 티켓을 통해 다른 과제로 변경할 수 있습니다. 
    <div style="text-align: left;">
    <div style="display: inline-block; margin: 10px;">
    <!-- GPS 인증 -->
    <b> | GPS 인증 </b>

    <img src="https://github.com/chaejeong-lee/chaejeong-lee/assets/112626357/1c3cf995-1531-41df-9b14-a9d0cee4afc6" width="200"/>
    </div>
    <div style="display: inline-block; margin: 10px;">
    <!-- AI 인증 GIF 넣기 -->
    <b> | AI 사진 인증 </b>
    
    <!-- <img src="https://github.com/chaejeong-lee/chaejeong-lee/assets/112626357/ad795175-c376-4431-bdf4-60d2cd690d0c" width="200"/> -->
    </div>
    </div>

🕊 <b>자유 도전</b>

- 자유롭게 만들고 달성할 수 있는 과제로, **만족감**을 느낄 수 있습니다.
- 도전을 `공유`하고 스크랩하여 **다양한 경험**을 할 수 있습니다.
- 완료한 도전은 마이페이지의 달력에서 날짜를 선택하여 확인할 수 있습니다. 

    <!-- 자유 스크랩 -->
    <b> | 자유 도전 날짜 지정 스크랩 & 완료 </b>
    
    <img src="https://github.com/chaejeong-lee/chaejeong-lee/assets/112626357/23904d6a-edb3-41a0-91a2-3a3671572fac" width="200"/>

### 2. 마이토리

🏁 <b>퀘스트</b>

- 데일리 퀘스트를 통해 다양한 기능을 이용하도록 사용자에게 **동기**를 부여했습니다.
- 모든 퀘스트를 완료하면 토토리 티켓을 얻을 수 있습니다.

<!-- 퀘스트 GIF -->
<img src="https://github.com/chaejeong-lee/chaejeong-lee/assets/112626357/ad795175-c376-4431-bdf4-60d2cd690d0c" width="200"/>

📚 <b>토리 도감</b>

- 얻은 도토리를 이용하여 다람쥐를 `수집`하여 `도감`을 채우는 **재미**를 느낄 수 있습니다.
    <!-- 토리 입양 GIF & 프로필 변경까지 넣기 -->
    <b> | 토리 입양 & 토리 프로필 변경</b>
        
    <img src="https://github.com/Endura0535/Endura0535/assets/12527782/1299c1aa-45ab-4714-8f88-0ed97f8d55a7" width="200"/>

🦊 <b>여우</b>

- 여우에게 산딸기를 주고 `따뜻한 편지`와 선물을 받을 수 있습니다.
- `긍정적 피드백`을 통해 **우울함을 완화**할 수 있습니다.
    <!-- 여우에게 먹이 주고 여우 오는거 GIF 넣기 -->
    <!-- <div style="text-align: left; display: flex;"> -->
    <table>
    <tr>
    <td>
    <span style="margin: 10px;">
    <b> | 여우에게 먹이 주기 </b>

    <img src="https://github.com/Endura0535/Endura0535/assets/12527782/8665f13e-76b7-4cce-8d7e-643bcbfd20f5" width="200"/>
    </span>
    </td>
    <td>
    <span style="margin: 10px;">
    <b> | 여우에게 받은 편지 보기 </b>
    
    <img src="https://github.com/Endura0535/Endura0535/assets/12527782/8fcc5dc7-4c3e-48c1-adc1-9147b89c3498" width="200"/>
    </span>
    </td>
    </tr>
    </table>
    <!-- </div> -->
🎰 <b>토토리</b>

- 토토리 티켓을 사용하여 보상(도토리, 랜덤 도전 갱신 티켓, 토토리 티켓)을 뽑을 수 있습니다.
- 매일 1회 `무료`로 뽑을 수 있어 자주 `접속`할 **동기**를 부여합니다.
    <!-- 토토리 GIF -->
    <b> | 여우에게 받은 편지 보기 </b>
    
    <img src="https://github.com/Endura0535/Endura0535/assets/12527782/2ccfb83b-715c-47ef-bbd1-83b72879841e" width="200"/>


### 3. 감사 일기

💗 <b>감사 일기</b>

- 매일 `감사한 일`을 기록하며 **긍정적인 생각**을 하게 되고, 우울감을 완화할 수 있습니다.
- 마이페이지에서 작성한 일기를 확인할 수 있습니다.
- 완료한 도전은 마이페이지의 달력에서 날짜를 선택하여 확인할 수 있습니다. 
- 음성 인식을 통해 편리하게 작성할 수 있습니다. 
    <div style="text-align: left;">
    <div style="display: inline-block; margin: 10px;">

    <!-- 감사 일기 STT 작성 및 달력에서 확인 GIF -->
    <b> | 감사 일기 STT 작성 </b>
    
    <img src="https://github.com/Endura0535/Endura0535/assets/12527782/47a65486-22f6-4717-b264-035807d26922" width="200"/>
    </div>
    <div style="display: inline-block; margin: 10px;">

    <!-- 감사 일기 STT 작성 및 달력에서 확인 GIF -->
    <b> | 작성한 감사 일기 확인 </b>
    
    <img src="https://github.com/Endura0535/Endura0535/assets/12527782/15131009-e4e4-421c-b76c-a0447dee73ec" width="200"/>
    </div>
    </div>


## 📏 시스템 아키텍처
### [MSA]
![시스템 아키텍처](./docs/ToriStory_architecture.png)

## 💻 협업 툴

## <img src="https://img.shields.io/badge/Github-181717?style=flat&logo=Github&logoColor=#181717"/> <img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=#000000"/> <img src="https://img.shields.io/badge/Mattermost-0058CC?style=flat&logo=mattermost&logoColor=#0058CC"/> <img src="https://img.shields.io/badge/GitLab-FC6D26?style=flat&logo=gitlab&logoColor=#FC6D26"/> <img src="https://img.shields.io/badge/Jira-0052CC?style=flat&logo=jirasoftware&logoColor=#0052CC"/>

<br><br>

## ⚙️ 기술 스택

### 🧷 프론트엔드

|||
|------|---------------------|
|<b>Language</b>|TypeScript|
|<b>Framework</b>|React 18.2.0|
|<b>Engine</b>|Node 18.17.1|
|<b>Library</b>|Jotai, Tailwind CSS, Axios, SWR, PWA, MUI|

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white"/> <img src="https://img.shields.io/badge/tailwind css-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/> <img src="https://img.shields.io/badge/Jotai-575757?style=flat&logo=jotai&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white"/> <img src="https://img.shields.io/badge/SWR-000000?style=flat&logo=swr&logoColor=white"/> <img src="https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white"/> <img src="https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white"/> <img src="https://img.shields.io/badge/pnpm-F69220?style=flat&logo=pnpm&logoColor=white"/>



### 🧷 백엔드

|||
|------|---------------------|
|<b>Language</b>|Java 11|
|<b>Framework</b>|Spring Boot 2.7.16|
|<b>Data(RDBMS)</b>|Spring-Data-JPA 2.7.16, MariaDB 10.11.5|
|<b>Cache</b>|Redis 2.7.16|
|<b>Build Tool</b>|Gradle|
|<b>Test</b>|Swagger 3.0.0|

<img src="https://img.shields.io/badge/Spring-6DB33F?style=flat&logo=Spring&logoColor=white"/> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat&logo=SpringBoot&logoColor=white"/> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=flat&logo=Spring&logoColor=white"/> <img src="https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=mariaDB&logoColor=white"/>
<img src="https://img.shields.io/badge/gradle-02303A?style=flat&logo=gradle&logoColor=white"/> <img src="https://img.shields.io/badge/redis-DC382D?style=flat&logo=redis&logoColor=white"/>

### 🧷 인프라

|||
|------|---------------------|
|<b>Infra</b>|AWS EC2, Nginx|
|<b>DB</b>|H2, MySQL 8|
|<b>CI/CD</b>|Git, Jenkins|

<img src="https://img.shields.io/badge/ubuntu-E95420?style=flat&logo=ubuntu&logoColor=white"/> <img src="https://img.shields.io/badge/Jenkins-D24939?style=flat&logo=jenkins&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat&logo=amazonec2&logoColor=white"/> <img src="https://img.shields.io/badge/nginx-009639?style=flat&logo=nginx&logoColor=white"/> <img src="https://img.shields.io/badge/amazons3-569A31?style=flat&logo=amazons3&logoColor=white"/> <img src="https://img.shields.io/badge/docker-2496ED?style=flat&logo=docker&logoColor=white"/>

<br><br>

## 🙌🏻 팀원 소개

|                                          Backend                                          |                                         Backend                                          |                                         Backend                                          |                                        Frontend                                         |                                        Frontend                                         |                                         Frontend                                         |
| :---------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/101117330?v=4" width=400px alt="아현"/> | <img src="https://avatars.githubusercontent.com/u/12527782?v=4" width=400px alt="수빈"/> | <img src="https://avatars.githubusercontent.com/u/78905126?v=4" width=400px alt="지은"/> | <img src="https://avatars.githubusercontent.com/u/56223389?v=4" width=400px alt="경륜"> | <img src="https://avatars.githubusercontent.com/u/49120917?v=4" width=400px alt="예빈"> | <img src="https://avatars.githubusercontent.com/u/112626357?v=4" width=400px alt="채정"> |
|                       [백아현(팀장)](https://github.com/dkgusdkfk)                        |                         [옥수빈](https://github.com/endura0535)                          |                           [이지은](https://github.com/jini11)                            |                          [김경륜](https://github.com/KimRiun)                           |                           [김예빈](https://github.com/byein)                            |                        [이채정](https://github.com/chaejeong-lee)                        |

<br><br>