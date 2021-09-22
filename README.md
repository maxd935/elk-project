# elk-project
Site de recherche de films

axios
## integrations JSON
```bash
curl -XPOST http://localhost:9200/movies/_bulk -H "Content-Type: application/json" -d @data/movies.json
```


\{%{QUOTEDSTRING:id}:"%{QUOTEDSTRING:title}",%{QUOTEDSTRING:poster}:%{QUOTEDSTRING: overview},%{NUMBER: release_date},%{QUOTEDSTRING:genres}*
{"id":"550315","title":"Fireman Sam - Set for Action!","poster":"https://image.tmdb.org/t/p/w500/2atmRsuSA4tX6sbOEgFzquFWcCV.jpg","overview":"","release_date":1538010000,"genres":["Family","Animation"]}

https://github.com/axios/axios
