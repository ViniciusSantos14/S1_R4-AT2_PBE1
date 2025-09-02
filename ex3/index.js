const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8081;

app.get("/eventos", (req, res) => {
  try {
    const { data } = req.query;
    const file = fs.readFileSync("./eventos.json", "utf-8");
    let eventos = JSON.parse(file);

    if (data) {
      eventos = eventos.filter(e => e.data === data);
    }

    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao ler ou processar o arquivo.", error });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

