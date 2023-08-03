# Anonygram React

## >> [*LIVE DEMO*](https://alan10607.github.io/Anonygram-Frontend/)
> An anonymous social media, create through React frontend and Spring Boot backend.
>
> This is the front-end of Anonygram

<br>


## Features
### Overview
- Trending article platform like Twitter
- Surf article(sort by update time) and leave comment
- User login or log in anonymously
- Prefernece setting: headshot, language, theme

## System Architecture
[photo]

### Server side Spring boot
- RESTFul API web service
- Trending articles sort by update time, implement by redis ZSET, update timeline time complexity almost O(1) because always add smaller score to ZSET (reverse timeline for score)
- Impliement prevent cache issue: cache penetration(store empty value), cache breakdown(distribution lock) and cache avalanche(random expiration times)
- Redis queue for sync data to DB
- JWT and CSRF token for authentication
- Imgur as image object store
- Docker compose services (Spring Boot, MySql and Redis), currently deploy in AWS EC2

#### Client side React
- React 18 functional component
- Redux with persist and thunk(async)
- Image previewable input box
- UI throttle and axios reduest pending
- Content html filter to prevent XSS

### UI Mockup

## QA Test

## Libraries / Dependencies
- axios
- i18next
- redux
- sass
- universal-cookie
- gh-pages

## Memo
Build on github page by gh-pages
```
npm run deploy   
```