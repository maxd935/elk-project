## Tout les films "les plus récent" par défaut

````bash
GET /movies/_search
{
  "sort" : [
    { "release_date" : {"order" : "desc", "format": "strict_date"}}
    ]
}
````

## Films par catégories (AND)
tableau apres must => $genres = [{ "term": { "genres": "$genre"}}]
````bash
GET /movies/_search
{
  "query": {
    "bool":{
      "must":[
      { "term": { "genres": "Action"}},
      { "term": { "genres": "Comedy"}}
      ]
    }
  }
}
````
    
})

## Trier par date de sortie
parametre apres order => $order ("asc"/"desc")
````bash
GET /movies/_search
{
  "sort" : [
    { "release_date" : {"order" : "desc", "format": "strict_date"}}
    ]
}
````

## Recherche de film par titre ou synopsis
parametre apres order => $search
````bash
GET /movies/_search
{
  "query": {
    "multi_match" : {
      "query":    "Marvel", 
      "fields": [ "title", "overview" ] 
    }
  }
}
````

## Recherche de film par plage de date
parametres apres gte et lte => $gte et $lte
````bash
GET /movies/_search
{
  "query": {
    "bool":{
      "must":[
        {"range": { "release_date": { "gte": 1454976000,  "lte": 1458976000}}}
      ]
    }
  }
}
````

## paginations & resultat
SIZE 10 par default
parametre apres from  => $from = pageActuel*SIZE
parametre apres size  => $size = min 3 max 10
````bash
GET /movies/_search
{
  "from":0,
  "size": 10,
  "query": {
    "match": {
      "title": "Marvel"
    }
  }
}
````

## nbr pages & nbr resultat
hits { total : { value : $nbrTotal }}  => Nbr resultat
$nbrTotal/size => Nbr pages
````bash
GET /movies/_search
{
  "from":0,
  "size": 10,
  "query": {
    "match": {
      "title": "Marvel"
    }
  }
}
````
