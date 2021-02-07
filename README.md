# resteasy-webserver
Node js web-server for RestEasy, an online food ordering web application.
# RestEasy APIs
* POST /user
    * To create a new user<br/>
    `{
    "name": "jayant",
    "email": "jv@jv.com",
    "password": "go123"
    }`
* POST /user/login
    * Login user<br/>
    `{
    "email": "jv@jv.com",
    "password": "go123"
    }`
* GET /user/me
    * View my user profile<br/>
    `Set header "Set-Cookie"="email": "jv@jv.com"`
* GET /user/logout
    * Logout of user session<br/>
    `Set header "Set-Cookie"="email": "jv@jv.com"`
* POST /dish
    * To create entry for a new dish<br/>
    `{
    "name": "Paneer Masala",
    "calories": 1000
    }`
* POST /vendor
    * To create entry for a new vendor<br/>
    `{
    "name": "Punjabi Palace",
    "address": "Airport Road"
    }`
* POST /product
    * To create entry for a new product<br/>
    `{
    "dishName": "Andhra Thali",
    "vendorName": "Adigas",
    "price": 400
    }`




