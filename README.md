# Anonygram

### >> [*LIVE DEMO*](https://alan10607.github.io/Anonygram/)
> A trending article web platform created using Backend (Spring Boot) and Frontend (React)




## System Architecture
_Check these links to find repositories of this system: [*Backend (Spring Boot)*](https://github.com/alan10607/Anonygram-Backend), [*Frontend (React)*](https://github.com/alan10607/Anonygram)_

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


## UI Mockup
Display in monile phone
### Trending Articles Page
_Article list with contents. Can be expanded to show more contents_
  |Article list|Expanded article with contents|Reply box under contents|Deleted contents|
  |---|---|---|---|
  |<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article4.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article2.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article3.jpg" width="300"/>|


### Add new article page & Setting page
  |Image-previewable input box|After creating new article|Setting page|Setting preference selected|
  |---|---|---|---|
  |<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/new.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/new2.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/setting.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/setting2.jpg" width="300"/>|


### Index
  |Login page|Registration page|
  |---|---|
  |<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/login.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/login2.jpg" width="300"/>|

### Another theme
  |Trending articles page|Add new article page|Setting page|
  |---|---|---|
  |<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article-light.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/new-light.jpg" width="300"/>|<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/setting-light.jpg" width="300"/>|

## QA Test

Test by ApacheBench, deploy as docker container, 
AWS EC2 t2.micro(Free Trial)
OS = Ubuntu, memoey = 1G + 3G(swap), disk = 64G

1. Test for query content size = (10 articles * 10 contents), TPS=
2. Test for query content size = (1 articles * 1 contents), TPS=


## Libraries / Dependencies
#### Spring boot 
spring security, redisson, thymeleaf, quartz, openapi, webFlux, jpa, aop, lombok...

#### React
axios, i18next, redux, sass, universal-cookie, gh-pages...


## Memo
Build on github page by gh-pages
```
npm run deploy   
```