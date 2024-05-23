# Anonygram
<p align="center">
    <img src="https://img.shields.io/badge/Spring Boot-3.1.5-green">
    <img src="https://img.shields.io/badge/React-18.2.0-blue">
    <img src="https://img.shields.io/badge/ElasticSearch-8.12.2-lightgray">
</p>

> Trending Article Web Platform  
> A trending article web platform created using Backend (Spring Boot) and Frontend (React).  

## Overview
The platform is designed to be displayed on a mobile phone.
<table>
  <tr>
    <th width="25%">Trending article list</th>
    <th width="25%">Expanded article thread</th>
    <th width="25%">Reply window</th>
    <th width="25%">Delete article</th>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article4.jpg" width="300"></td>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article.jpg" width="300"></td>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article2.jpg" width="300"></td>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article3.jpg" width="300"></td>
  </tr>
  <tr>
    <th>Image-previewable input box</th>
    <th>After creating article with image</th>
    <th>Search with keyword</th>
    <th></th>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/new.jpg" width="300"/></td>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/new2.jpg" width="300"/></td>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article5.jpg" width="300"></td>
    <td></td>
  </tr>
  </tr>
      <th>Setting page</th>
      <th>User preference</th>
      <th>Login page</th>
      <th>Registration page</th>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/setting.jpg" width="300"></td>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/setting2.jpg" width="300"></td>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/login.jpg" width="300"/></td>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/login2.jpg" width="300"/></td>
  </tr>
  </tr>
      <th>Trending article list (Light theme)</th>
      <th>Creating new article (Light theme)</th>
      <th>Setting page (Light theme)</th>
      <th></th>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/article-light.jpg" width="300"/></td>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/new-light.jpg" width="300"/></td>
    <td><img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/setting-light.jpg" width="300"/></td>
    <td></td>
  </tr>
</table>


## System Architecture
<img src="https://raw.githubusercontent.com/alan10607/Anonygram/docs/system2.jpg"/>

## Features
### Overview
- A trending article platform similar to Twitter
- Display articles, reply articles, search articles
- User login and authentication
- Preference settings: profile picture, language, theme

### Features Details
#### Server side - Spring boot
- RESTFul API web service with OpenAPI3 document (Swagger) 
- Trending articles sorted by update time, implemented using LRU cache
- Cache issue prevention: cache penetration (storing empty values), cache breakdown (distribution lock), and cache avalanche (random expiration times)
- JWT and CSRF token for authentication
- Imgur used as image objects store
- Containerization and deployment using Docker Compose

#### Client side - React
- React 18 functional components
- Redux with persistence and thunk (asynchronous actions)
- Image-previewable input box
- UI throttle and Axios pending request
- Content html filter to prevent XSS

## Quick Start
Run with docker-compose
```
docker-compose up
```
## Query API
_Check other APIs in OpenAPI documentation: https://localhost/api/swagger_

### Example
#### Get discussion by page
- Request URL:
GET:https://localhost/api/discussion/{{articleId}}?page=1
- Response Body:
```
{
    "articleId": "bc054e47-1d25-4325-93a3-69beb0cb26c4",
    "status": "NORMAL",
    "count": 3,
    "articles": [
        {
            "articleId": "bc054e47-1d25-4325-93a3-69beb0cb26c4",
            "no": 0,
            "authorId": "TEsbXg9K",
            "title": "About Penguins",
            "word": "Penguins are a group of aquatic flightless birds from the family Spheniscidae of the order Sphenisciformes. They live almost exclusively in the Southern Hemisphere: only one species, the Galápagos penguin, is found north of the Equator. Highly adapted for life in the ocean water, penguins have countershaded dark and white plumage and flippers for swimming. Most penguins feed on krill, fish, squid and other forms of sea life which they catch with their bills and swallow whole while swimming. A penguin has a spiny tongue and powerful jaws to grip slippery prey.",
            "status": "NORMAL",
            "createdTime": "2024-05-23T23:00:41",
            "updatedTime": "2024-05-23T23:00:41",
            "likeCount": 0,
            "like": false,
            "authorName": "TEsbXg9K"
        },
        {
            "articleId": "bc054e47-1d25-4325-93a3-69beb0cb26c4",
            "no": 1,
            "authorId": "GRIZAQpK",
            "word": "Penguins are a group of aquatic flightless birds from the family Spheniscidae of the order Sphenisciformes. They live almost exclusively in the Southern Hemisphere: only one species, the Galápagos penguin, is found north of the Equator. Highly adapted for life in the ocean water, penguins have countershaded dark and white plumage and flippers for swimming. Most penguins feed on krill, fish, squid and other forms of sea life which they catch with their bills and swallow whole while swimming. A penguin has a spiny tongue and powerful jaws to grip slippery prey.",
            "status": "NORMAL",
            "createdTime": "2024-05-23T23:00:41",
            "updatedTime": "2024-05-23T23:00:41",
            "likeCount": 0,
            "like": false,
            "authorName": "GRIZAQpK"
        },
        {
            "articleId": "bc054e47-1d25-4325-93a3-69beb0cb26c4",
            "no": 2,
            "authorId": "ExMfDV0c",
            "word": "Penguins are a group of aquatic flightless birds from the family Spheniscidae of the order Sphenisciformes. They live almost exclusively in the Southern Hemisphere: only one species, the Galápagos penguin, is found north of the Equator. Highly adapted for life in the ocean water, penguins have countershaded dark and white plumage and flippers for swimming. Most penguins feed on krill, fish, squid and other forms of sea life which they catch with their bills and swallow whole while swimming. A penguin has a spiny tongue and powerful jaws to grip slippery prey.",
            "status": "NORMAL",
            "createdTime": "2024-05-23T23:00:41",
            "updatedTime": "2024-05-23T23:00:41",
            "likeCount": 0,
            "like": false,
            "authorName": "ExMfDV0c"
        }
    ]
}
```

## Stress Test
Use ApacheBench for stress testing
```
cd api/src/test/ab
python3 script.py
```