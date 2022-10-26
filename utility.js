let results = require('./data')

module.exports.youtube = async(query_parameter) => {
    const { google } = require('googleapis')
    const youtube = google.youtube({
        version: 'v3',
        auth: process.env.API_KEY_YT
    })
    const response = await youtube.search.list({
        part: 'snippet',
        q: query_parameter,
        type: 'video',
        maxResults: 10
    })
    const searchResults = response.data.items
    const youtubeData = searchResults.map(queryResult => {
        return {
            id: queryResult.id.videoId,
            title: queryResult.snippet.title,
            imgUrl: queryResult.snippet.thumbnails.medium.url
        }
    });
    results.youtube = youtubeData
}

async function stackoverflow(query_parameter) {

}

async function googleSearch(query_parameter) {

}

async function github(query_parameter) {

}