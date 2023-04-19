# Anonygram React

## >> [*LIVE DEMO*](https://alan10607.github.io/Anonygram-Frontend/)
> An anonymous social media, create through React front-end and Spring Boot back-end.
> 
> This is the front-end of Anonygram

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












------

# Java / Spring Boots
## abstract class vs interface
- https://www.delftstack.com/zh-tw/howto/java/abstract-class-vs-interface-java/

## try with resource
- https://www.uuu.com.tw/Public/content/article/18/20180611.htm
- https://www.baeldung.com/java-try-with-resources

## Singleton / Double-Checked Locking
- https://www.baeldung.com/java-singleton-double-checked-locking
- https://ianjustin39.github.io/ianlife/design-pattern/singleton-pattern/

## Design Pattern
- https://ithelp.ithome.com.tw/users/20128314/ironman/3070?page=1
- https://ithelp.ithome.com.tw/articles/10201706

# Http / Web
## CORS 跨來源資源共用
- https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS

## CSRF 跨站請求偽造
- https://tech-blog.cymetrics.io/posts/jo/zerobased-cross-site-request-forgery/

## XSS跨網站指令碼
- https://tech-blog.cymetrics.io/posts/jo/zerobased-cross-site-scripting/

## SSRF 伺服器端請求偽造
- https://medium.com/%E7%A8%8B%E5%BC%8F%E7%8C%BF%E5%90%83%E9%A6%99%E8%95%89/%E7%B6%B2%E7%AB%99%E5%AE%89%E5%85%A8-%E4%BC%BA%E6%9C%8D%E5%99%A8%E8%AB%8B%E6%B1%82%E5%81%BD%E9%80%A0-ssrf-%E6%94%BB%E6%93%8A-%E9%A0%85%E8%8E%8A%E8%88%9E%E5%8A%8D-%E6%84%8F%E5%9C%A8%E6%B2%9B%E5%85%AC-7a5524926362
- https://ithelp.ithome.com.tw/articles/10242449

## Http vs Https
https://shubo.io/https/#https-%E6%98%AF%E4%BB%80%E9%BA%BC-%E5%92%8C-http-%E7%9A%84%E5%B7%AE%E5%88%A5%E6%98%AF%E4%BB%80%E9%BA%BC
https://progressbar.tw/posts/98

## Spring Boot TLS1.2
https://www.jdon.com/56028.html
https://blog.csdn.net/HD243608836/article/details/109105540

# SQL
## ACID
- https://totoroliu.medium.com/%E8%B3%87%E6%96%99%E5%BA%AB-acid-bb87324035a8

## Window Function
- https://medium.com/%E6%95%B8%E6%93%9A%E4%B8%8D%E6%AD%A2-not-only-data/%E5%A6%82%E4%BD%95%E5%8D%81%E5%88%86%E9%90%98%E5%85%A7%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B%E8%88%87%E4%BD%BF%E7%94%A8-window-function-e24e0a7e75ba
- https://ithelp.ithome.com.tw/articles/10289360

## GraphQl
- https://www.appcoda.com.tw/graphql/
