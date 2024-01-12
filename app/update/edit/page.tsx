"use client"
import axios from "axios";
import Navbar from "../../navbar/navbar";
import '../../scrollbar.css'
import newsJson from '@/public/news/news.json';
import { useEffect, useState } from "react";
import assets from "../../images";
import Image from "next/image";
import { fromjson } from "../data_structure";

import { fetchapi } from "@/app/api";

export default function AddNews() {
    // console.log(newsJson);
    
    return (
        <div className='bg-inherit h-svh'>
        <div className='sticky bg-inherit top-0 z-100'>
            <Navbar />
        </div>
        <div className='transition-all max-sm:w-4/5 max-md:w-3/4 max-lg:w-2/3 max-xl:w-2/3 max-w-screen-lg  mx-auto'>
            <AddNewsContent />
        </div>
        </div>
    )
}

var toFetch=false

function AddNewsContent() {

    const [addRemove, setAddRemove] = useState(true);
    const [newsList, setNewsList] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [toFetch, setToFetch] = useState(false);


    async function addnews(){
        
        var title = document.getElementsByTagName('textarea')[0].value;
        var content = document.getElementsByTagName('textarea')[1].value;
        if(title!='' && content!=''){
            // read json file
            // var newsjson = fs.readFile(process.cwd() + '/public/news/news.json', 'utf8');
            // fetch('@/public/news/news.json').then((resp)=>{
            //     resp.json()
            // }).then((json)=>{
            //     console.log(json);
                
            // })
            
            var news = {
                date: Date.now(),
                title: title,
                news: content
            }
            console.log(newsJson);
            
            newsJson.push(news);
            
            axios.post(
                fetchapi+'/addnews',
                news
            ).then((res)=>{
                // console.log(res);
                alert('News added successfully');
                
            }).catch((err)=>console.log(err))

            // console.log(newsJson);
            // newsjson.push(news);
            // fs.writeFileSync(process.cwd()+'/public/news/news.json', JSON.stringify(newsJson));

        }
    }

    function edit() {
        setAddRemove(false);
        setToFetch(true);
    }


    if(addRemove===true) {
        return (
            <div style={{}} className="  ">
                <div className='text-2xl text-gray-700 p-2 block text-center underline underline-offset-8'>
                    <p>Add News</p>
                </div>
                
                <div className="mt-5 h-full">
                    <form action={addnews}>
                        <textarea  className='w-full flex-wrap text-wrap  bg-white bg-opacity-30 rounded-t-md text-xl text-gray-700 outline-none resize-none py-2 px-5'  placeholder='Title'></textarea> 
                        <textarea className='w-full h-64 bg-white bg-opacity-30 rounded-b-md outline-none text-gray-600 resize-none py-3 px-5' placeholder='Content'></textarea>
                        <input type="submit" value="Submit" className='w-full md:w-auto bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-500 hover:text-gray-400 font-bold py-2 px-4 rounded-md' />
                        <button onClick={edit} className="w-full md:w-auto bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-500 hover:text-gray-400 font-bold py-2 px-4 md:ml-5 my-2 rounded-md">delete notifications</button>
    
                    </form>
                </div>
                
            </div>  
        )
    }
    else {


        if(toFetch){
            fetch(fetchapi+'/getNews').then((result)=>{
                result.json().then((json)=>{
                    var list:any = [];
                    var articles = json['articles'];
                    for (let i = 0; i < articles.length; i++) {
                        const art = articles[i];
                        list.push(
                            <NewsComponent key={i} id={i+1} news={fromjson(art)} callback={setToFetch} />
                        )
                        
                    }
                    setNewsList(list)
                    setFetched(true)
                    setToFetch(false);
                })
            })
        }

        
        return (
            <div className="">
                <div className="flex justify-between text-2xl text-gray-700 p-2  ">
                    <p className="grow text-center underline underline-offset-8">Delete Notification</p>
                    <button className=" bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-500 hover:text-gray-400 font-bold py-1 px-3 md:ml-5  rounded-md" onClick={()=>{setAddRemove(true), setFetched(false)}}>&times;</button>
                </div>
                <div style={{height: `calc(100vh - 9rem)`}} className=" bg-white bg-opacity-30 rounded-lg mt-2 mb-1 overflow-y-scroll ">
                    {fetched?newsList:
                    <div className='h-full w-full flex flex-col justify-center items-center'>
                        <Image alt='spinner' className='animate-spin size-8' width={10} height={10} src={assets.images.spinner.src}/>
                        <p  className='text-5xl animate-pulse'>Loading</p>
                    </div>}
                </div>
            </div>

        )
    }
}

function deleteItem(id: any, title: String, callback:Function) {
    axios.post(
        fetchapi+'/delete',
        {
            id: id,
            title: title
        }
    ).then((res)=>{
        callback(true);
    })
}

function NewsComponent(props:any){
    // const [isSaved,setSaved] = useState(false);
    
    return (
        <>
        <div className="flex pt-2 pr-5 justify-between items-center">
            <div className="w-12 shrink-0 text-center self-start text-2xl text-gray-700 ">
                <p>{props.id}</p>
            </div>
            <div className="w-full text-gray-500">
                <div className="w-full flex justify-between  text-gray-700 items-center">
                    <p className="text-lg pr-6 text-justify">{props.news?.title??'Headindg'}</p>
                    <button onClick={()=>deleteItem(props.id-1, props.news.title, props.callback)} className="shrink-0 h-5 w-5">
                        <Image  src={assets.images.deleteIcon.src} width={40} height={40}  alt={""} className="w-5 fill-slate-400" />  
                    </button>
                    {/* <p className='shrink-0 self-start' >{(new Date(props.news?.date)).toString().split(/\d\d:\d\d/)[0].split(' ').slice(1).join(' ')}</p> */}
                </div>
                {/* <div>
                    <p className="text-sm text-justify">{props.news.news??'News details'}</p>

                </div> */}
            </div>
            {/* <div  className="px-2 self-start ">
                <button hidden={true} onClick={()=>{isSaved?setSaved(false):setSaved(true)}} className='w-8'>
                    <img className='fill-slate-500' src={assets.images.bookmark.src}/>
                </button>
            </div> */}
        </div>
        <div className="h-px my-2 bg-white bg-opacity-45 align-bottom"></div>

        </>
    )
}