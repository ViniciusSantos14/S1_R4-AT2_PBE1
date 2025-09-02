const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8081;

app.get("/produtos/:pagina", (req, res) => {
  try {
    const { pagina } = req.params;
    const file = fs.readFileSync("./produtos.json", "utf-8");
    const produtos = JSON.parse(file);

    const paginaNum = parseInt(pagina);
    const itensPorPagina = 10;

    const inicio = (paginaNum - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;

    if (inicio >= produtos.length || paginaNum < 1) {
      return res.status(404).json({ error: "Página não encontrada" });
    }

    const resultado = produtos.slice(inicio, fim);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao ler ou processar o arquivo.", error });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

