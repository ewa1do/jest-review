const fetch = require('node-fetch')
// import fetch from 'node-fetch'

const getPeoplePromise = (fetch) => {
    return fetch('https://swapi.dev/api/people')
        .then((response) => response.json())
        .then((data) => {
            return {
                count: data.count,
                results: data.results,
            }
        })
}

const getPeople = async (fetch) => {
    const response = await fetch('https://swapi.dev/api/people')

    const data = await response.json()

    const { count, results } = data

    return { count, results }
}

module.exports = {
    getPeople,
    getPeoplePromise,
}
