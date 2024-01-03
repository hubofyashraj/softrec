import { fromjson, newsList } from "../data_structure";

var url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=9a69958ae4334b06b5da657c0f86f9a1';

var req = new Request(url);

export function fetchNews(): Promise<boolean>{
    return new Promise((resolve, reject) => {
        fetch(req)
        .then(function(response) {
            // console.log(response.json());
            response.json().then(
                function(json){
                    // console.log(json);
                    
                    for(var article of json['articles']){
                        newsList.push(fromjson(article))
                    }
                }
            )
            resolve(true);
        }).catch((reason)=>{
            console.log(reason);
            
            reject(false);
        })
    })
}