export default class API {
    static url = "http://localhost:9200/movies/_search"

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

    static filmsPlusRecents() {
        let query = {
            "sort" : [
                { "release_date" : {"order" : "desc", "format": "strict_date"}}
            ]
        }
        return this.fetchElasticSearch(query)
    }

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

    static filmsByOrder(order) {
        let query = {
            "sort" : [
                { "release_date" : {"order" : "desc", "format": "strict_date"}}
            ]
        }
        query.sort[0].release_date.order=order
        return this.fetchElasticSearch(query)
    }


    static filmsByRechText(texte) {
        let query = {
            "query": {
                "multi_match" : {
                    "query": "Marvel",
                    "type": "best_fields",
                    "fields": [ "title", "overview" ]
                }
            }
        }
        query.query.multi_match.query=texte
        return this.fetchElasticSearch(query)
    }



}
