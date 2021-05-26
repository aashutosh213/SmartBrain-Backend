//requiring external modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");

//requrinf internal modules
const Register = require("./Controllers/Register");
const Signin = require("./Controllers/Signin");
const Profile = require("./Controllers/Profile");
const Images = require("./Controllers/Images");

//port
const PORT = 4001;
//using modules
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: "5432",
    user: "postgres",
    password: "aashu213",
    database: "postgres",
  },
  pool: { min: 0, max: 7 },
});

const database = {
  users: [
    {
      id: "123",
      email: "krap@gmail.com",
      password: "minus",
      name: "krap",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      email: "dream@gmail.com",
      password: "helicopter",
      name: "dream",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then((data) => res.json(data))
    .catch((err) => res.status(400).send("unable to fetch data"));
});

app.post("/signin", (req, res) => {
  Signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  Register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  Profile.handleProfileGet(req, res, db);
});

app.put("/images", (req, res) => {
  Images.handleImages(req, res, db);
});

app.post("/imagesurl", (req, res) => {
  Images.handleApiCall(req, res);
});

app.listen(PORT, () => {
  console.log(`***server is running on port ${PORT}***`);
});

/*
/ --> res = this is working
/signim --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/

// psql in docker
// 1. docker restart psql
// 2. docker container ls
// 3. docker exec -it psql bash -l
// 4.  psql -h localhost -U postgres
//5. docker container stop psql
