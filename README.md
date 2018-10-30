# Hostel Finder Project #

## Description ##

A basic backend API service for an hostel finding app or website.

The following core libraries were used:
* ExpressJS - The http server
* Passport-JWT, - The authentication libraries to support auth strategies
* Mongoose - To interact with MongoDB
* JWT-Simple - To create the JWT token



## Endpoints ##

**Signup**

url: `https://sleepy-caverns-28290.herokuapp.com/signup`

method: POST

Header
Content-Type: `application/x-www-form-urlencoded`

Request Body
- email (unique email) Required
- password Required

Response
```
[{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjU1YzE3YjZhMTdhYjAwMDRlMzc5MzEiLCJpYXQiOjE1MzIzNDY3NDczNjV9.7_wrm3j7pEPVtpkZWt-S9dWx1brR8FrMSfgO3nl7Afk"
}]
```


**Login**

url: `https://sleepy-caverns-28290.herokuapp.com/signin`

method: POST

Header
Content-Type: `application/x-www-form-urlencoded`

Request Body
- email Required
- password Required

Response
```
[{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjU1YzE3YjZhMTdhYjAwMDRlMzc5MzEiLCJpYXQiOjE1MzIzNDY3NDczNjV9.7_wrm3j7pEPVtpkZWt-S9dWx1brR8FrMSfgO3nl7Afk"
}]
```

url: `https://sleepy-caverns-28290.herokuapp.com/profile`

method: GET

Header
- Content-Type: `application/x-www-form-urlencoded`
- authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjU1YzE3YjZhMTdhYjAwMDRlMzc5MzEiLCJpYXQiOjE1MzIzNDY3NDczNjV9.7_wrm3j7pEPVtpkZWt-S9dWx1brR8FrMSfgO3nl7Afk`

Response
```
[{
email: "tolufakiyesi@yahoo.com"
}]
```


url: `https://sleepy-caverns-28290.herokuapp.com/create`

method: POST

Header
Content-Type: `application/x-www-form-urlencoded`
authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjU1YzE3YjZhMTdhYjAwMDRlMzc5MzEiLCJpYXQiOjE1MzIzNDY3NDczNjV9.7_wrm3j7pEPVtpkZWt-S9dWx1brR8FrMSfgO3nl7Afk`

Request Body
- location	: required
- lowerpriceRange	: required
- upperPriceRange
- address		: required, unique
- types		: required
- numberOfRooms	: default: '1'

Response
```
[{
  url: "https://sleepy-caverns-28290.herokuapp.com/view/S9dWx1brR8FrMSfgO3nl7Afk"
}]
```


url: `https://sleepy-caverns-28290.herokuapp.com/view/:hostel_id`

method: GET

Header
Content-Type: `application/x-www-form-urlencoded`

Response
```
[{
    "_id": "5b55f682146483495dae6a10",
    "authorId": "5b55f62c146483495dae6a0f",
    "location": "Mayfair",
    "address": "Somewhere somewhere",
    "types": "\"self con\"",
    "__v": 0,
    "date_added": "2018-07-23T15:38:42.250Z",
    "numberOfRooms": "1",
    "priceRange": {
      "lower": "75000"
    }
}]
```

url: `https://sleepy-caverns-28290.herokuapp.com/hostels`

method: GET

Header
Content-Type: `application/x-www-form-urlencoded`

Response
```
[
  {
    "_id": "5b55f682146483495dae6a10",
    "authorId": "5b55f62c146483495dae6a0f",
    "location": "Mayfair",
    "address": "Somewhere somewhere",
    "types": "\"self con\"",
    "__v": 0,
    "date_added": "2018-07-23T15:38:42.250Z",
    "numberOfRooms": "1",
    "priceRange": {
      "lower": "75000"
    }
  },
  {
    "_id": "5b55f9625e9f124ba21b9a86",
    "authorId": "5b55f62c146483495dae6a0f",
    "location": "Mayfair",
    "address": "Somewhere not somewhere",
    "types": "\"self con\"",
    "__v": 0,
    "date_added": "2018-07-23T15:50:58.334Z",
    "numberOfRooms": "1",
    "priceRange": {
      "lower": "75000"
    }
  }
]
```