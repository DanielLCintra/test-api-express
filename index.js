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

app.post("/users", (req, res) => {
  //     user.add({});
  console.log(req.body);
  res.send("Usuário criado com sucesso!");

  res.status = 201;
});

app.put("/users/:id", (req, res) => {
  //     const user = users.find(id);
  //     users.update(data);
  console.log(req.body);
  res.status = 202;
  res.send("Usuário atualizado com sucesso!");
});

app.delete("/users/:id", (req, res) => {
  res.status = 200;
  res.send("Usuário excluído com sucesso!");
});

app.get("/users/:id", (req, res) => {
  const users = [
    { id: "1", nome: "Daniel", telefone: "(11)93390-6518" },
    { id: "2", nome: "Clovis", telefone: "(11)090999-6518" },
  ];

  const user = users.find((user) => user.id === req.params.id);
  const message = "Usuário localizado";

  res.status = 200;
  res.send({ message, user });
});

app.listen(port, () => {
  console.log("A api está funcionando na porta" + port);
});
