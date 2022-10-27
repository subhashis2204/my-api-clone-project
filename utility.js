let results = require('./data')
const axios = require('axios')

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

module.exports.stackoverflow = async(query_parameter) => {
    const baseUrl = `https://api.stackexchange.com/2.3/search?pagesize=10&order=desc&sort=activity&intitle=${query_parameter}&site=stackoverflow`
    const response = await axios.get(baseUrl)

    const searchResults = response.data.items
    const stackoverflowData = searchResults.map(searchResult => {
        return {
            title: searchResult.title,
            url: searchResult.link,
            tags: searchResult.tags
        }
    })
    results.stackoverflow = stackoverflowData
}

module.exports.googleSearch = async(query_parameter) => {
    const baseUrl = "https://api.scaleserp.com"
    const searchUrl = `${baseUrl}/search?api_key=${process.env.API_KEY_GS}&q=${query_parameter}`

    const response = await axios.get(searchUrl)
    const searchResults = response.data.organic_results

    const googleSearchData = searchResults.map(searchResult => {
        return {
            title: searchResult.title,
            url: searchResult.link,
            description: searchResult.snippet
        }
    })
    results.googleSearch = googleSearchData
}

module.exports.github = async(query_parameter) => {
    const baseUrl = `https://api.github.com/search`
    const searchUrl = `${baseUrl}/repositories?q=${query_parameter}`
    const response = await axios.get(searchUrl)

    const searchResults = response.data.items
    const githubData = searchResults.map(searchResult => {
        return {
            title: searchResult.full_name,
            url: searchResult.html_url,
            description: searchResult.description
        }
    })
    results.github = githubData
}