import express from "express"
import mysql2 from "mysql2"
import dotenv from "dotenv"
import cors from 'cors'

dotenv.config()

const app = express()

const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"*********", //senha do banco de dados
    database:"*********"  //nome do banco de dados
})

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }));

app.get("/", (req, res) => {
    res.json("Olá isto é o backend")
})

app.get("/produtos", (req, res) => {
    const query = "SELECT * FROM produtos"
    db.query(query, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/produtos", (req, res) => {
    const query = "INSERT INTO produtos (`nomde_do_produto`, `descricao_do_produto`, `preco`) VALUES (?)"
    const values = [
        req.body.nomde_do_produto,
        req.body.descricao_do_produto,
        req.body.preco,
    ]

    db.query(query, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Produto foi criado com sucesso!")
    })
} )

app.delete("/produtos/:codigo_do_produto", (req, res) => {
    const codigoDoProduto = req.params.codigo_do_produto;
    const query = "DELETE FROM produtos WHERE codigo_do_produto = ?"

    db.query(query, [codigoDoProduto], (err, data) => {
        if (err) return res.json(err);
        return res.json("O produto foi deletado com sucesso")
    })
})

app.put("/produtos/:codigo_do_produto", (req, res) => {
    const codigoDoProduto = req.params.codigo_do_produto;
    const data = req.body

    const query = "UPDATE produtos SET `codigo_do_produto` = ?, `nomde_do_produto` = ?, `descricao_do_produto` = ?, `preco` = ? WHERE codigo_do_produto = ? " 
    const values = [
        data.codigo_do_produto,
        data.nomde_do_produto,
        data.descricao_do_produto,
        data.preco
    ]

    db.query(query,[...values,codigoDoProduto], (err,data) => {
        if(err) return res.status(404).json(err)
        return res.status(200).json(data)
    })
})

app.listen(8800, () => {
    console.log("Conectar ao backend")
}) 

