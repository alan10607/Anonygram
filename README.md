# Anonygram React

## >> [*LIVE DEMO*](https://alan10607.github.io/Anonygram/)
> An trending article web platform create through React frontend and Spring Boot backend.
>
> This is the front-end of Anonygram

<br>



## System Architecture
_Check these links to find repositories of this system: [*Backend (Spring Boot)*](https://alan10607.github.io/Anonygram/), [*Frontend (React)*](https://alan10607.github.io/Anonygram/)_

<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/system.jpg"/>

## Features
### Overview
- Trending article platform like Twitter
- Surf article(sort by update time) and leave comment
- User login or log in anonymously
- Prefernece setting: headshot, language, theme

### Features Details
#### Server side - Spring boot
- RESTFul API web service with OpenAPI3 document (swagger) 
- Trending articles sort by update time, implement by redis ZSET, update timeline time complexity almost O(1) because always add smaller score to ZSET (reverse timeline for score)
- Impliement prevent cache issue: cache penetration(store empty value), cache breakdown(distribution lock) and cache avalanche(random expiration times)
- Redis queue for sync data to DB
- JWT and CSRF token for authentication
- Imgur as image object store
- Docker compose services (Spring Boot, MySql and Redis), currently deploy in AWS EC2

#### Client side - React
- React 18 functional component
- Redux with persist and thunk(async)
- Image previewable input box
- UI throttle and axios reduest pending
- Content html filter to prevent XSS

## UI Mockup
Display in monile phone
- Trending articles page, article list with contents and can be open out more
  <img src="https://raw.githubusercontent.com/alan10607/webGame/master/docs/demo4.jpg" width="300"/>


- Add new content page, input box is image previewable

- Setting page

- Login index

- Another theme

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