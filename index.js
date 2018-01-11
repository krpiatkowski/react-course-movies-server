const express = require('express')
var fs = require('fs');

const app = express()

const PORT = 3001

let movies = JSON.parse(fs.readFileSync("./movies.json", "utf8"));

app.use(express.static('public'))

app.get('/movies', (req, res) => {
    movies.forEach(movie => {
        movie.imageUrl = `http://localhost:${PORT}/images/${movie.imageUrl}`
    });
    
    res.json(movies)
})

app.listen(PORT, () => console.log(`Serving movies on port ${PORT}!`))