import express from 'express';
import fs from 'fs';
import cors from 'cors';
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/getnews',(req,res)=>{
    fs.readFile(process.cwd()+'/news.json', 'utf-8', (err, data)=>{
        if(err){
            res.json({status:403, r: 'internal server err'})
        }
        var newsJson = JSON.parse(data);
        res.json({
            articles: newsJson
        })
    })
})

app.post('/addnews', (req, res)=>{
    // console.log(req.body);
    var newsJson=[];

    fs.readFile(process.cwd()+'/news.json', 'utf-8', (err, data)=>{
        if(err){
            res.json({status:403, r: 'internal server err'})
            return
        }
        newsJson = JSON.parse(data);
        // console.log(newsJson);

        newsJson = [req.body, ...newsJson.slice(0)];
        // console.log(newsJson);
    
        fs.writeFile(process.cwd()+'/news.json', JSON.stringify(newsJson), ()=>{} )
    
        res.json({});
    })
    
})

app.post('/delete', (req, res)=>{
    var dt = req.body;

    var newsJson=[];

    fs.readFile(process.cwd()+'/news.json', 'utf-8', (err, data)=>{
        if(err){
            res.json({status:403, r: 'internal server err'})
            return
        }
        newsJson = JSON.parse(data);
        // console.log(newsJson);
        // console.log(newsJson);
        // console.log(dt);
        if(newsJson[dt.id].title == dt.title) {
            newsJson = [...newsJson.slice(0, dt.id), ...newsJson.slice(dt.id+1)];
        }

        // newsJson = [req.body, ...newsJson.slice(0)];
        // console.log(newsJson);
    
        fs.writeFile(process.cwd()+'/news.json', JSON.stringify(newsJson), ()=>{} )
    
        res.json({});
    })
    
})

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
})
