const express = require("express");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");

// get all users
app.get("/listUsers", (req, res) => {
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    err
      ? res.status(500).send("Error reading data file")
      : res.json(JSON.parse(data));
  });
});

// add a user

var user = {
  name: "malek",
  password: "password3",
  profession: "administrator",
};

app.post("/addUser", (req, res) => {
  fs.readFile("users.json", "utf8", function (err, data) {
    list = JSON.parse(data);
    user = { ...user, id: list.length + 1 };
    list.push(user);

    fs.writeFileSync("users.json", JSON.stringify(list));
    res.status(200).send("User added successfully.");
  });
});

// delete user

app.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile("users.json", "utf8", function (err, data) {
    list = JSON.parse(data);

    const user = list.findIndex((user) => user.id === Number(id));
    if (user === -1) {
      res.status(404).send("User not found");
      return;
    } else {
      list.splice(user, 1);
      fs.writeFileSync("users.json", JSON.stringify(list));
    }

    // console.log(list);
    res.send(JSON.stringify(list));
  });
});

// get user by id

app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile("users.json", "utf8", function (err, data) {
    list = JSON.parse(data);
    const user = list.filter((info) => info.id === Number(id));
    
    user.length
      ? res.send(JSON.stringify(user))
      : res.status(404).send("User not found");
  });
});

app.listen(3000);
