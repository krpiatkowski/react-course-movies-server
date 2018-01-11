#!/usr/bin/env node

const express = require('express')
const serveIndex = require('serve-index')
const path = require('path')
var fs = require('fs')

const app = express()

const PORT = 3001

let movies = JSON.parse(fs.readFileSync(path.resolve(__dirname, "movies.json"), "utf8"))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.use('/images', express.static('public/images'), serveIndex('public/images', {'icons': true}))

app.get('/movies', (req, res) => {
    movies.forEach(movie => {
        movie.imageUrl = `http://localhost:${PORT}/images/${movie.imageUrl}`
    });

    res.json(movies)
})

app.listen(PORT, () => console.log(`Serving movies on port ${PORT}!`))