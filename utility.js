// const { timeDifferenceCalculator } = require("time-difference-calculator")

let results = require('./data')
const axios = require('axios')

module.exports.youtube = async(query_parameter) => {
    const { google } = require('googleapis')
    const youtube = google.youtube({
        version: 'v3',
        auth: process.env.API_KEY_YT
    })

    const timeDifferenceCalculator = (fromDate, toDate = new Date()) => {
        const differenceOfTwoDates = Math.abs(Math.max(Date.parse(toDate), Date.parse(fromDate)) - Math.min(Date.parse(fromDate), Date.parse(toDate)));
        const SEC = 1000,
            MIN = 60 * SEC,
            HRS = 60 * MIN;
        const hrs = Math.floor(differenceOfTwoDates / HRS);
        const min = Math.floor((differenceOfTwoDates % HRS) / MIN).toLocaleString('en-US', { minimumIntegerDigits: 2 })
        if (hrs == 0) {
            return `${min} mins ago.`
        }
        if (min == 0) {
            return `just now.`;
        }
        if (hrs >= 24) {
            const days = Math.ceil(hrs / 24)
            const months = Math.ceil(days / 30)
            const years = Math.ceil(months / 12)
            if (years > 0)
                return `${years} ${(years > 1) ? 'years' : 'year'} ago`
            if (months > 0)
                return `${months} ${(months > 1) ? 'months' : 'month'} ago`
            if (days > 0)
                return `${days} ${(days > 1) ? 'days' : 'day'} ago`
        }
        return `${hrs} hrs ago.`
    }

    const response = await youtube.search.list({
        part: 'snippet',
        q: query_parameter,
        type: 'video',
        maxResults: 10
    })
    const searchResults = response.data.items
    const youtubeData = searchResults.map(queryResult => {
        const td = timeDifferenceCalculator(queryResult.snippet.publishTime)
        return {
            id: queryResult.id.videoId,
            title: queryResult.snippet.title,
            time: td,
            imgUrl: queryResult.snippet.thumbnails.medium.url
        }
    });
    results.youtube = youtubeData
        // results.youtube = searchResults
}

module.exports.stackoverflow = async(query_parameter) => {
    const params = {
        pagesize: 10,
        order: "desc",
        sort: "activity",
        intitle: query_parameter,
        site: "stackoverflow"
    }
    const baseUrl = `https://api.stackexchange.com/2.3/search`
    const response = await axios.get(baseUrl, { params })

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
    const params = {
        api_key: process.env.API_KEY_GS,
        q: query_parameter,
        gl: "in"
    }
    const baseUrl = "https://api.scaleserp.com/search";

    const response = await axios.get(baseUrl, { params })
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
    const params = {
        q: query_parameter
    }
    const baseUrl = `https://api.github.com/search/repositories`
        // const searchUrl = `${baseUrl}/repositories?q=${query_parameter}`

    const response = await axios.get(baseUrl, { params })

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