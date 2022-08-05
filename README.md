![MERN logo](MERN-logo.png)

# Blog-express
### Full rest-api backend for blog

>For fast start server run: `npm i` `npm run dev`  

#### Description

This service was created for a simple blog, written in express.YS. To manage posts, KRUD requests are implemented. The service works on mongodb. This is a simple pet project for mastering the MERN stack

#### Run servise

Install dependencies command `npm install`.  
For run web-server run: `npm run dev`, if a successful launch in the terminal will be displayed   
`Server started on http://127.0.0.1:8000`   
If the service successfully connects to the database, you will see a message:  
`DB connected`

Else will be displayed errors.

`npm run dev` launch nodemoon, if you want clear run: `npm run start`

#### Deploy
* Configure `.env` file  
* Install dependencies `npm install`  
* Run `npm run start` in root directory of project  

# API docs
#### Status codes
| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |


**All URLs are relative to the host**

| Path | Type | Description |
| :--- | :--- | :--- |
| `/` | `get` | For test server |
| `/posts/:id` | `get` | Return post by ID |
| `/posts/:id` + **JSON** | `patch` | Update post by ID |
| `/posts/:id` + **Bearer** | `delete` | Remove post by ID |
| `/posts/` | `get` | Return all posts |
| `/posts/` + **JSON** | `post` | Create post |
| `/auth/me` + **Bearer** | `get` | Return user info by him token and verificate user |
| `/auth/login` + **JSON** | `post` | Authorizing by JWT token, return userinfo and token |
| `/auth/register` + **JSON** | `post` | Registration by JWT token, return userinfo and token |
| `/upload` + **Bearer** + **FILE** | `post` | Upload file on server (onlu for authorized users) |
| `/uploads/:filename` | `get` | Get file from server by filename |


### Requests  

`POST /auth/login`
```javascript
{
    "email": String,
    "password": String
}
```

`POST /auth/register`
```javascript
{
    "fullName": String  
    "email": String,  
    "password": String,  
    "avatarUrl": String  
}
```
  
`PATCH /posts/:id` `POST /posts/`
```javascript
{
    "title": String,
    "text": String,
    "tags": Array,
    "imageUrl": String
}
```




### That's all.  

@danzo0l