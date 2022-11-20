# gt-api
This is the main GT API ( node.js server) written in NodeJS which is responsible for handle all API end points


## Requirements

* Node 16
* Git
* Python (for tulind libray)


## Common setup

Clone the repo and install the dependencies.

Step 1:

```bash
cd root-of-app
```

Step 2:

```bash
npm install
```

Step 6: Open `.env.example` and copy all data and create a new file in your local directry called `.env` and past data to it and set config variables

```
#Mongo DB
MONGODB_CONNECT_URI=dblink/mde
TEST_MONGODB_CONNECT_URI=dblink/mde_test
TESTDB_MONGODB_CONNECT_URI=dblink/mde_testdb

#JWT
JWT_SECRET=abc123
JWT_REFRESH_SECRET = abc123

#FCM
FCM_API_TOKEN=aaa

```

Step 7: To start the express server in development environment, run the following
```bash
npm run start-dev
```
Step 8: To start the express server, run the following
```bash
npm start
```

Step 9: To run test cases

```bash
npm run test
```


