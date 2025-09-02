const express = require('express');
const app = express();
const PORT = 8081;
const fs = require('fs');
 
app.get("/livros", (req, res) => {
    try {
        const { titulo, autor, ano } = req.query;

        const data = fs.readFileSync('./livros.json', 'utf-8');
        let livros = JSON.parse(data);

        if (titulo) {
            livros = livros.filter(livro => 
                livro.titulo.toLowerCase().includes(titulo.toLowerCase())
            );
        }

        if (autor) {
            livros = livros.filter(livro => 
                livro.autor.toLowerCase().includes(autor.toLowerCase())
            );
        }
        if (ano) {
            const anoNum = parseInt(ano);
            livros = livros.filter(livro => livro.ano >= anoNum);
        }

        res.status(200).json(livros);

    } catch (error) {
        console.error("Erro ao ler o arquivo livros.json", error);
        res.status(500).send("Erro interno no servidor");
    }
});

app.listen(PORT, () => {                                       
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

