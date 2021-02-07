# resteasy-webserver
Node js web-server for RestEasy, an online food ordering web application.
# RestEasy APIs
* POST /user
    * To create a new user<br/>
    <pre>
    {
    "name": "jayant",
    "email": "jv@jv.com",
    "password": "go123"
    }</pre>
* POST /user/login
    * Login user<br/>
    <pre>
    {
    "email": "jv@jv.com",
    "password": "go123"
    }</pre>
* GET /user/me
    * View my user profile<br/>
    `Set header "Set-Cookie"="email": "jv@jv.com"`
* GET /user/logout
    * Logout of user session<br/>
    `Set header "Set-Cookie"="email": "jv@jv.com"`
* POST /dish
    * To create entry for a new dish<br/>
    <pre>
    {
    "name": "Paneer Masala",
    "calories": 1000
    }</pre>
* POST /vendor
    * To create entry for a new vendor<br/>
    <pre>
    {
    "name": "Punjabi Palace",
    "address": "Airport Road"
    }</pre>
* POST /product
    * To create entry for a new product<br/>
    <pre>
    {
    "dishName": "Andhra Thali",
    "vendorName": "Adigas",
    "price": 400
    }</pre>




