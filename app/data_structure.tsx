
export class News {
    readonly date: number=0;
    readonly title: string='';
    readonly news: string='';

    constructor(date?: number, title?:string, news?:string){
        this.date=date??0;
        this.title=title??'Placeholder';
        this.news=news??'Placeholder';
    }


    toJson(){
        return {
            date: this.date,
            title: this.title,
            news: this.news,
        }
    }


    toString(){
        return JSON.stringify(
            this.toJson()
        );
    }

}

//loading news from json
export function fromjson(json:any):News {
    var obj = {
        "date":new Date(json['date']),
        "title":json["title"],
        "news":json['news']
    }
    return Object.assign(new News(), obj);
}

// fetching news via api
// export function fromjson(json:any):News {
//     var obj = {
//         "date":new Date(json['publishedAt']),
//         "title":json["title"],
//         "news":json['description']
//     }
//     return Object.assign(new News(), obj);
// }


export const demo = new News(Date.now(),'Demo News','This is a demo news. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus sed numquam quas. Quibusdam perferendis ab ipsam numquam alias, ad error dicta officia enim, asperiores recusandae. Facilis, tempore. Tenetur, incidunt perspiciatis Eos sunt iste quidem recusandae rerum, et labore dicta, molestiae laudantium omnis delectus ut error. Quod iure, tenetur unde odio eaque a possimus, sapiente fuga non commodi libero harum adipisci?')

export const apikey = "9a69958ae4334b06b5da657c0f86f9a1";

export var newsList:News[] = [];