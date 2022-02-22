const express = require("express");
const app = express();
const importData = require("./data.json");
let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("A api em express está funcionando");
});

app.get("/users", (req, res) => {
  res.send(importData);
});

app.listen(port, () => {
  console.log("A api está funcionando na porta" + port);
});
