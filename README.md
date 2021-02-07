# resteasy-webserver
Node js web-server for RestEasy, an online food ordering web application.
Express is the http server library used for the APIs.
# Prerequisites & Installation
The runtime for this program is provided by Node.js which is a JavaScript runtime.
* Prerequisite: Ensure that you have the following installed
    * Node.js version >= 14.15.4, download available from nodejs.org
    * npm (Node package manager) gets installed with the Node install
    * Run `node --version` and `npm --version` commands to check that you have a proper install
    * MongoDB is used as database for the service, so ensure MongoDB is running
    * Run `node --version` and `npm --version` commands to check that you have a proper install
    * Run `./mongod.exe --dbpath=./mongodb-data` to launch MongoDB 
    * Update **MONGODB_URL** in the config env, eg. `MONGODB_URL=mongodb://127.0.0.1:27017/resteasy-api`
* Installation
    * Download the code from this github repo to your local machine using `git clone` command.
    * Then run the `npm install` command to get various modules used by the program
    * `$ git clone https://github.com/keyhorizons/resteasy-webserver`
    * `$ cd resteasy-webserver`
    * `$ npm install`
    * Then run the `$ npm run dev` to launch the webserver
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
* POST /cart
    * Add a product and quantity to cart<br/>
    <pre>
    {
    "dishName": "Dosa",
    "vendorName": "Sukh Sagar",
    "quantity": 2
    }</pre>
* GET /cart
    * View items in the cart<br/>
    `Set header "Set-Cookie"="email": "jv@jv.com"`
* POST /order
    * Place order/checkout cart to create order with items in the cart<br/>
    `Set header "Set-Cookie"="email": "jv@jv.com"`
* GET /order?&sortByAmount=desc&sortByDate=desc
    * view orders sorted by order amount and created date
* GET /order?&sortByDate=asc
    * view orders sorted by created date
* GET /order?&sortByAmount=desc
    * view orders sorted by order amount
* GET /product?sortBy=price:asc&vendor=Adigas
    * view products from a particular vendor, sorted by price