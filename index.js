const express = require("express");
const app = express();
const importData = require("./data.json");

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

let port = process.env.PORT || 3000;

const { Client } = require("pg");

const client = new Client({
  user: "jodhuqdbbqgmci",
  host: "ec2-54-209-221-231.compute-1.amazonaws.com",
  database: "dcha25fgn4f2je",
  password: "468773b321e617a943aaaeabd032daed5e36ba60e54f76cf21eac9d8751dd18b",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

app.get("/", (req, res) => {
  res.send("A api em express está funcionando");
});

app.get("/users", (req, res) => {
  client.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.post("/users", (req, res) => {
client.query(
  "insert into users(name, telephone)values('"+ req.body.name + "','"+ req.body.telephone + "')"
    , (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json("Usuário inserido com sucesso");
    }
  )
});

app.put("/users/:id", (req, res) => {
  client.query(
    'UPDATE users SET name = $1, telephone = $2 WHERE id = $3', [req.body.name, req.body.telephone, req.params.id]
      , (error, results) => {
        if (error) {
          throw error;
        }
    console.log(req.body);
    res.status = 202;
    res.send("Usuário atualizado com sucesso!");
    }
  )
});

app.delete("/users/:id", (req, res) => {
  client.query(
    'delete from users where id = $1', [req.params.id]
    , (error, results) => {
      if (error) {
        throw error;
      }
    res.status = 200;
    res.send("Usuário excluído com sucesso!");
  }
)
});

app.get("/users/:id", (req, res) => {
  client.query(
    'select * from users where id = $1', [req.params.id]
    , (error, results) => {
      if (error) {
        throw error;
      }
    res.status(200).json(results.rows);
  }
)
});

app.listen(port, () => {
  console.log("A api está funcionando na porta: " + port);
});
