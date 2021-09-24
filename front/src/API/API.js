export default class API {
    static url = "http://localhost:9200/movies/_search"

    static query = {
        "query": {
            "bool":{
                "must": [],
                "filter": [
                    {"range": {
                        "release_date": {
                            "gte": -999999999999999,
                            "lte": 999999999999999
                        }
                    }}
                ]
            }
        },
        "sort" : [
            { "release_date" : {"order" : "desc", "format": "strict_date"}}
        ],
        "aggs": {
            "genres": {
                "terms": {
                    "field": "genres"
                }
            },
            "min_date": { "min": { "field": "release_date" } },
            "max_date": { "max": { "field": "release_date" } }
        },
        "from": 0,
        "size": 10,
    }

    static fetchElasticSearch() {
        return fetch(this.url, {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
            ],
            body: JSON.stringify(this.query)
        })
            .then((response) => response.json())
            .then(data => {return data})
            .catch((error) => console.error(error))
    }

    static setOrder(order) {
        this.query.sort[0].release_date.order = order
        return this.fetchElasticSearch()
    }

    static setGenres(genres){
        this.query.query.bool.filter = this.query.query.bool.filter.filter(
            (val, idx, arr) => {
                if (Object.keys(val)[0] === "term") {
                    return false
                } else {
                    return true
                }
            })
        if (genres.length > 0) {
            genres.forEach(genre => {this.query.query.bool.filter.push({"term":{"genres":genre}})})
        }
        return this.fetchElasticSearch()
    }

    static setSearchText(text) {
        if (text.length === 0){
            this.query.query.bool.must = []
        } else {
            this.query.query.bool.must = [
                {"multi_match":{
                        "fields": [ "text", "overview" ],
                        "query": text,
                        "fuzziness": 2
                    }
                }
            ]
        }
        console.log("query:")
        console.log(this.query)
        this.fetchElasticSearch().then(data => {
            console.log("response:")
            console.log(data);
        })
        return this.fetchElasticSearch()
    }

    static setDateRange(dateOf, dateTo) {
        this.query.query.bool.filter[0].range.release_date = { "gte": dateOf,  "lte": dateTo}
        return this.fetchElasticSearch()
    }

    static filmPagination(from, size) {
        this.query.from = from
        this.query.size = size
        return this.fetchElasticSearch()
    }
}
