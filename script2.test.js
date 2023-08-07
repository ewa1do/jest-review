const fetch = require('node-fetch')
const { getPeople, getPeoplePromise } = require('./script2')

describe('async test', () => {
    it('calls swapi to get geople', async () => {
        expect.assertions(1)
        const data = await getPeople(fetch)
        return expect(data.count).toEqual(82)
    })

    it('calls swapi to get people with a promise', async () => {
        expect.assertions(2)

        const data = await getPeoplePromise(fetch)

        expect(data.count).toEqual(82)
        expect(data.results.length).toBeGreaterThan(5)
        return
        // return getPeoplePromise(fetch).then((data) => {
        //     expect(data.count).toEqual(82)
        //     expect(data.results.length).toBeGreaterThan(5)
        // })
    })

    // Mocks and spies
    it('getPeople returns count and result', () => {
        const mockFetch = jest.fn().mockReturnValue(
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        count: 82,
                        results: [0, 1, 2, 3, 4, 5],
                    }),
            })
        )

        expect.assertions(4)
        return getPeoplePromise(mockFetch).then((data) => {
            expect(mockFetch.mock.calls.length).toBe(1)
            expect(mockFetch).toBeCalledWith('https://swapi.dev/api/people')
            expect(data.count).toEqual(82)
            expect(data.results.length).toBeGreaterThan(5)
        })
    })
})
