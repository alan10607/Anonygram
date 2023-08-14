# Anonygram React

## >> [*LIVE DEMO*](https://alan10607.github.io/Anonygram-Frontend/)
> An anonymous social media, create through React frontend and Spring Boot backend.
>
> This is the front-end of Anonygram

<br>


## Features
### Overview
- React 18 functional component
- Redux with persist and thunk(async)
- I18n and theme prefernece
- Http-only cookie and CSRF token for authentication
- Image uploadi


### Components
- Console
- Error
- Login
- Main
  - Header
  - Body
    - Forum
      - Article
        - Content
          - Bar
          - Info
          - Word
        - Move
        - Reply
          - UploadImgBtn
    - New
    - Setting

### Redux
- forum
- common
- user (persisted)

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

## Libraries / Dependencies
- axios
- i18next
- redux
- sass
- universal-cookie
- gh-pages

## Build
Build on github page by gh-pages
```
npm run deploy   
```