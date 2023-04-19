# Anonygram React

## >> [*LIVE DEMO*](https://alan10607.github.io/Anonygram-Frontend/)
> An anonymous social media, create through React front-end and Spring Boot back-end.
>
> This is the front-end of Anonygram

<br>

## Build
```
npm run deploy   
```

## Components
- Console
- Login
- Register
- Error
- Hub
  - Art
    - ArtCont
    - Bar
    - Cont
    - Info
    - Move
    - Reply
    - ReplyInput
    - Word
  - BigBox
  - Header
  - New
  - Setting

## Redux
- post: Main data
- common: Component controll
- reply: Reply temp storage
- user: User data from JWT

## Servics
```
+-------------+  payload  +-------------+
|  Login Com  | --------> |   Art Com   |
+-------------+           +-------------+
      ^                          ^
      |                          |
      v                          v
+----------------+        +----------------+
| Authentication |        |  post api      |
|  back-end      |        |  back-end      |
+----------------+        +----------------+

```