export default class API {
    static url = "http://localhost:9200/movies/_search"

    static allGenres() {
        let query = {
            "aggs": {
                "genres": {
                    "terms": {
                        "field": "genres"
                    }
                }
            }
        }
        return this.fetchElasticSearch(query)
    }

    static byGenre(genres) {
        let query = {
            "query": {
                "bool":{
                    "must":[]
                }
            }
        }
        genres.forEach(genre => {query.query.bool.must.push({"term":{"genres":genre}})})
        return this.fetchElasticSearch(query)
    }

    static allMarvel() {
        let query = {
            "query": {
                "match": {
                    "title": "Marvel"
                }
            }
        }
        return this.fetchElasticSearch(query)
    }

    static filmsPlusRecents() {
        let query = {
            "query": {
                "match": {
                    "title": "Marvel"
                }
            }
        }
        return this.fetchElasticSearch(query)
    }

    static fetchElasticSearch(elasticsearch_query) {
        return fetch(this.url, {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
            ],
            body: JSON.stringify(elasticsearch_query)
        })
            .then((response) => response.json())
            .then(data => {return data})
            .catch((error) => console.error(error))
    }
}
