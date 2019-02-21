const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.json());

var project = [
  {
    id: 1,
    title: "Project One",
    author: "Andrews",
    body: "Company one"
  },
  {
    id: 2,
    title: "Project Two",
    author: "Andy",
    body: "Company two"
  },
  {
    id: 3,
    title: "Project Three",
    author: "Kay",
    body: "Company three"
  }
];

var users = [
    {
      id: "User01",
      firstname: "Andy",
      lastname: "Kay",
      username: "Andykm",
      pass: "melody",
      email: "kay@mail.com",
      is_admin: true
    },
    {
      id: "User02",
      firstname: "Andy",
      lastname: "Kay",
      username: "Andykm",
      pass: "melody",
      email: "kay@mail.com",
      is_admin: false
    },
    {
      id: "User03",
      firstname: "Andy",
      lastname: "Kay",
      username: "Andykm",
      pass: "melody",
      email: "kay@mail.com",
      is_admin: false
    }
  ];

//Home Route
app.get("/", function(req, res) {
  res.status(200).send({
    success_state: true,
    message: "Success",
    project: project
  });
});

app.post("/register", (req, res) => {
  const user_info = req.body;
  users.push(user_info);
  res.status(200).send({
    success_state: true,
    message: "Success user created"
  });
});

app.post("/login", middleWareAuth, (req, res) => {
  jwt.sign({ user: req.body }, "SHHH", (err, token) => {
    res.json({
      token: token
    });
  });
});

app.post("/addproject", (req, res) => {

  const project = req.body.project;

  if (is_admin(req.body.user)) {
    users.push(project);
    res.status(200).send({
      success_state: true,
      message: "Project Added"
    });
  } else {
    res.sendStatus(403).send({
        success_state: false,
        message: 'Failed',
    });
  }
});

function is_admin(user) {
  return user.is_admin;
}

function middleWareAuth(req, res, next) {
    const user_info = req.body;
    for( let i = 0; i < users.length; i++) {
        if ( users[i].username === user_info.username && users[i].pass === user_info.pass ) {
            next();
            return;
        }
    }
    res.status(403).send({
        success_state: false,
        message: 'Wrong Credentials',
    });
}

//Start Server
app.listen(9000, function() {
  console.log("Server start on port 9000.....");
});
