import { createServer } from "http";
import { parse } from "url";
import { createConnection } from "mysql";

const server = createServer((req, res) => {
    const query = parse(req.url, true).query;
    const nome = query.nome;
    const senha = query.senha;
    const connection = createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "votaaco"
    });
    connection.connect();
    connection.query("INSERT INTO usuario (nome, senha) VALUES (?, ?)", [nome, senha], (error, results) => {
        if (error) {
            res.writeHead(500);
            res.end("Erro ao adicionar usuário: " + error.message);
        } else {
            res.writeHead(200);
            res.end("Usuário adicionado com sucesso!");
        }
    });
});

server.listen(8080);