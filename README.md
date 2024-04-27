# Anonygram
<p align="center">
	<a href="https://github.com/alan10607/Anonygram/tree/master/web" target="_blank">
        <img src="https://img.shields.io/badge/Github-Anonygram Frontend-green">
	</a>
	<a href="https://github.com/alan10607/Anonygram/tree/master/api" target="_blank">
        <img src="https://img.shields.io/badge/Github-Anonygram Backend-blue">
	</a>
    <img src="https://img.shields.io/badge/React-18.2.0-lightgray">
    <img src="https://img.shields.io/badge/Spring Boot-2.7.3-lightgray">
    <img src="https://img.shields.io/badge/Redis-7.0.4-lightgray">
    <img src="https://img.shields.io/badge/MySql-8.0.30-lightgray">
</p>

### >> [*LIVE DEMO*](https://alan10607.github.io/Anonygram/)
> A trending article web platform created using Backend (Spring Boot) and Frontend (React)


## System Architecture

<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/system.jpg"/>

## Features
### Overview
- A trending article platform similar to Twitter
- Browse articles (sorted by update time) and leave comments
- User login or anonymous login
- Preference settings: profile picture, language, theme

### Features Details
#### Server side - Spring boot
- RESTFul API web service with OpenAPI3 document (Swagger) 
- Trending articles sorted by update time, implemented using Redis ZSET. update timeline time complexity is nearly O(1) because always adds smaller score to ZSET (reverse timeline for score)
- Implementation of cache issue prevention: cache penetration (storing empty values), cache breakdown (distribution lock), and cache avalanche (random expiration times)
- Redis queue for synchronizing data to DB
- JWT and CSRF token for authentication
- Imgur used as image objects store
- Docker compose services (Spring Boot, MySql and Redis), currently deploy on AWS EC2

#### Client side - React
- React 18 functional components
- Redux with persistence and thunk (asynchronous actions)
- Image-previewable input box
- UI throttle and Axios pending request
- Content html filter to prevent XSS

## Query API
_Check other APIs in backend [OpenAPI](https://13.112.45.117/swagger) document_

#### GET:/forum/article/{idList}/{noList} 
Example:   
- GET:/forum/article/8b9df0a3-2f54-41ee-bbac-fe160d1800c5,d9f82031-4702-4453-9160-e64616dddef7/0,1,2
```
[
    {
        "id": "8b9df0a3-2f54-41ee-bbac-fe160d1800c5",
        "title": "test1",
        "status": "NORMAL",
        "createDate": "2023-09-04T18:14:53.543919",
        "updateDate": "2023-09-04T18:14:53.543919",
        "contentSize": 11,
        "contentList": [
            {
                "id": "8b9df0a3-2f54-41ee-bbac-fe160d1800c5",
                "no": 0,
                "authorId": "2c9380848a3230ee018a3231381a0000",
                "word": "1",
                "likes": 0,
                "status": "NORMAL",
                "createDate": "2023-09-04T18:14:53.543919",
                "updateDate": "2023-09-04T18:14:53.543919",
                "like": false,
                "authorName": "alan10607",
                "authorHeadUrl": "https://i.imgur.com/tIee7qw.jpeg"
            },
            {
                "id": "8b9df0a3-2f54-41ee-bbac-fe160d1800c5",
                "no": 1,
                "authorId": "2c9380848a3230ee018a3231381a0000",
                "word": "1",
                "likes": 0,
                "status": "NORMAL",
                "createDate": "2023-09-04T18:15:44.979322",
                "updateDate": "2023-09-04T18:15:44.979322",
                "like": false,
                "authorName": "alan10607",
                "authorHeadUrl": "https://i.imgur.com/tIee7qw.jpeg"
            }
        ]
    },
    {
        "id": "d9f82031-4702-4453-9160-e64616dddef7",
        "title": "test2",
        "status": "NORMAL",
        "createDate": "2023-09-04T18:14:59.148204",
        "updateDate": "2023-09-04T18:14:59.148204",
        "contentSize": 10,
        "contentList": [
            {
                "id": "d9f82031-4702-4453-9160-e64616dddef7",
                "no": 0,
                "authorId": "2c9380848a3230ee018a3231381a0000",
                "word": "2",
                "likes": 0,
                "status": "NORMAL",
                "createDate": "2023-09-04T18:14:59.148204",
                "updateDate": "2023-09-04T18:14:59.148204",
                "like": false,
                "authorName": "alan10607",
                "authorHeadUrl": "https://i.imgur.com/tIee7qw.jpeg"
            },
            {
                "id": "d9f82031-4702-4453-9160-e64616dddef7",
                "no": 1,
                "authorId": "2c9380848a3230ee018a3231381a0000",
                "word": "Stress Test demo",
                "likes": 0,
                "status": "NORMAL",
                "createDate": "2023-09-04T18:20:43.076193",
                "updateDate": "2023-09-04T18:20:43.076193",
                "like": false,
                "authorName": "alan10607",
                "authorHeadUrl": "https://i.imgur.com/tIee7qw.jpeg"
            }
        ]
    }
]
```


## UI Mockup
Display in monile phone
### Trending Articles Page
  |Article list|Expanded article with contents|
  |---|---|
  |<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article4.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article.jpg" width="300"/>|

  |Reply box under contents|Deleted contents|
  |---|---|
  |<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article2.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article3.jpg" width="300"/>|
<br>

### Add new article page & Setting page
  |Image-previewable input box|After creating new article|
  |---|---|
  |<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/new.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/new2.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/setting.jpg" width="300"/>|

  |Setting page|Setting preference selected|
  |---|---|
  |<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/setting.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/setting2.jpg" width="300"/>|
<br>

### Index
  |Login page|Registration page|
  |---|---|
  |<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/login.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/login2.jpg" width="300"/>|
<br>

### Another theme
  |Trending articles page|Add new article page|Setting page|
  |---|---|---|
  |<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article-light.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/new-light.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/setting-light.jpg" width="300"/>|


## Stress Test
Testing in local and AWS EC2 t2.micro (Free Trial, a memory-constrained environment, Instance: Memoey: 1G + 4G(swap),  Disk: 20G)  

Test by ApacheBench
1. Test for query content, size = (1 articles * 1 contents)  
Document Path Example: /forum/article/8b9df0a3-2f54-41ee-bbac-fe160d1800c5/0  

- Test in t2.micro
  ```
  Concurrency Level:      100
  Time taken for tests:   60.153 seconds
  Complete requests:      3166
  Failed requests:        30
    (Connect: 0, Receive: 0, Length: 30, Exceptions: 0)
  Non-2xx responses:      30
  Total transferred:      3143962 bytes
  HTML transferred:       1747756 bytes
  Requests per second:    52.63 [#/sec] (mean)
  Time per request:       1899.969 [ms] (mean)
  Time per request:       19.000 [ms] (mean, across all concurrent requests)
  Transfer rate:          51.04 [Kbytes/sec] received
  ```

- Test in local
  ```
  Concurrency Level:      100
  Time taken for tests:   60.171 seconds
  Complete requests:      10512
  Failed requests:        0
  Total transferred:      10148094 bytes
  HTML transferred:       5500836 bytes
  Requests per second:    174.70 [#/sec] (mean)
  Time per request:       572.406 [ms] (mean)
  Time per request:       5.724 [ms] (mean, across all concurrent requests)
  Transfer rate:          164.70 [Kbytes/sec] received
  ```


2. Test for query content size = (10 articles * 10 contents)  
Document Path Example: /forum/article/8b9df0a3-2f54-41ee-bbac-fe160d1800c5,d9f82031-4702-4453-9160-e64616dddef7,ed96f24a-8a76-435d-ad7a-fe0ffa9fb98d,69019fa8-c9d8-4362-ac48-0375dbb433a7,1c1334fc-f584-4b17-b35e-9fff50ad24a6,7b83f863-9915-4f94-8a03-5817f7af98c2,68138700-8f6e-450d-8fd7-6b22a8128e5f,b5001015-b6db-46d3-ae93-32ffed95cd77,e8969416-07cf-4168-8d85-edda23e3457f,0b9773bc-bd65-46d9-bd70-e1b6e63d6c60/0,1,2,3,4,5,6,7,8,9  

- Test in t2.micro
  ```
  Concurrency Level:      100
  Time taken for tests:   60.295 seconds
  Complete requests:      320
  Failed requests:        0
  Total transferred:      11097920 bytes
  HTML transferred:       10956800 bytes
  Requests per second:    5.31 [#/sec] (mean)
  Time per request:       18842.262 [ms] (mean)
  Time per request:       188.423 [ms] (mean, across all concurrent requests)
  Transfer rate:          179.75 [Kbytes/sec] received
  ```

- Test in local
  ```
  Concurrency Level:      100
  Time taken for tests:   60.544 seconds
  Complete requests:      514
  Failed requests:        12
    (Connect: 0, Receive: 0, Length: 12, Exceptions: 0)
  Non-2xx responses:      12
  Total transferred:      17426348 bytes
  HTML transferred:       17199674 bytes
  Requests per second:    8.49 [#/sec] (mean)
  Time per request:       11778.891 [ms] (mean)
  Time per request:       117.789 [ms] (mean, across all concurrent requests)
  Transfer rate:          281.09 [Kbytes/sec] received
  ```



## Libraries / Dependencies
#### Spring boot 
spring security, redisson, thymeleaf, quartz, openapi, webFlux, jpa, aop, lombok...

#### React
axios, i18next, redux, sass, universal-cookie...


## Memo
Build on github page by gh-pages
```
npm run deploy   
```