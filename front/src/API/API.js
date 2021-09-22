export default function API() {

    const url = "http://localhost:9200/movies/_search"
    const query = {
        "query": {
            "match": {
                "title": "Marvel"
            }
        }
    }
    const opt = {
        method: 'POST',
        headers: [
            ["Content-Type", "application/json"]
        ],
        body: JSON.stringify(query)
    }
    return fetch(url, opt)
        .then((response) => response.json())
        .then(data => {return data.hits.hits})
        .catch((error) => console.error(error))
}
