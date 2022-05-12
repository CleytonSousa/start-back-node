const express = require("express")
const app =  express()
const mysql = require("./mysqlConect").pool;
const port = 3333
app.use(express.json())

const tb_movie = "TB_MOVIE"

app.get("/movies", (req, res) => {
    mysql.getConnection((err, conn) => {
        conn.query(
            `SELECT * FROM ${tb_movie}`,
            (err, results, field) => {
                conn.release();
                if(err){
                    return res.status(500).send({"erro": err})
                }

                return res.status(200).send({results})
            }
        )
    })
})

app.get("/buscar", (req, res) => {
    mysql.getConnection((err, conn) => {
        conn.query(
            `SELECT * FROM ${tb_movie} WHERE DS_NAME = ?`,
            [req.body.name],
            (err, results, field) => {
                conn.release();
                if(err){
                    return res.status(500).send({"erro": err})
                }

                return res.status(200).send({results})
            }
        )
    })
})

app.get("/ano", (req, res) => {
    mysql.getConnection((err, conn) => {
        conn.query(
            `SELECT * FROM ${tb_movie} WHERE DS_LANCAMENTO = ?`,
            [req.body.dataLancamento],
            (err, results, field) => {
                conn.release();
                if(err){
                    return res.status(500).send({"erro": err})
                }

                return res.status(200).send({results})
            }
        )
    })
})

app.post("/create-movie", (req, res) => {
    mysql.getConnection((err, conn) => {
        conn.query(
            `INSERT INTO ${tb_movie} (DS_NAME, DS_LANCAMENTO) VALUES (?, ?)`,
            [req.body.name, req.body.lancamento],
            (err, results, field) => {
                conn.release();
                if(err){
                    return res.status(500).send({"erro": err})
                }

                return res.status(201).send({
                        mensagem: "Filme criado no banco de dados",
                        usuario: results.insertId
                    })
            }
        )
    })
})


app.listen(port, () => {
    console.log("O pai tá on")
})