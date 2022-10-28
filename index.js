const express = require('express')
const path = require('path');
const { youtube, stackoverflow, github, googleSearch } = require('./utility');
const app = express();
const port = process.env.PORT || 3000
const results = require('./data')

require('dotenv').config({ path: './TEST.env' })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/search", async(req, res) => {
    const searchQuery = req.query.search_query

    let promises = []
    const windows = [youtube, stackoverflow, github, googleSearch]
    windows.forEach(window => {
        promises.push(window(searchQuery))
    })

    await Promise.all(promises);
    // await youtube(searchQuery);
    // await stackoverflow(searchQuery)
    // await github(searchQuery)
    // await googleSearch(searchQuery)

    res.render('youtube', { results })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})