'use client'
import './scrollbar.css'
import {demo, fromjson, News, newsList} from './data_structure'
import assets from './images';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import { fetchNews } from './news/fetchnews';

// import newsjson from './news/news.json';

export default function Content(){
    const [listofnews, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(
        ()=>{
            var list:any = [];

            fetch('http://localhost:5000/getnews').then((val)=>{
                val.json().then((json)=>{
                    // console.log(json);
                    const articles = json['articles'];
                    for(var i=0;i<articles.length;i++){
                        // console.log(i);
                        
                        list.push(<NewsComponent key={i} news={fromjson(articles[i])} id={i+1}/>);
                    }
                    // console.log(list);
                    
                    setList(list);
                    setIsLoading(false);
                })
                
            }).catch((err)=>{
                console.log(err);
                
            })

            // for(var i=0;i<newsjson.length;i++){
            //     list.push(<NewsComponent key={i} news={fromjson(newsjson[i])} id={i+1}/>);
            // }
            // setList(list);
            // setIsLoading(false);
            


            // fetchNews().then(
            //     ()=>{
            //         var list: any=[];
            //         setList([])                    

            //         for(var i=0;i<newsList.length;i++){
            //             list.push(<NewsComponent key={i} news={newsList[i]} id={i+1}/>);
            //         }
            //         setIsLoading(false);
            //         setList(list);
                    
            //     }
            // ).catch(
            //     (reason)=>{
            //         console.log(reason);
            //         setList([])                    
            //     }
            // )
            
        
        }, []
    )
    


    return (
        <>
        
        <div className='text-2xl text-gray-700 p-2 block text-center underline underline-offset-8'>
            <p>News & Notification</p>
        </div>
        <div id='newspan' style={{height: `calc(100vh - 9rem)`}} className=" bg-white bg-opacity-30 rounded-lg mt-2 mb-1 overflow-y-scroll ">
            
            {
            isLoading?
            <div className='h-full w-full flex flex-col justify-center items-center'>
                <Image alt='spinner' className='animate-spin size-8' width={10} height={10} src={assets.images.spinner.src}/>
                <p  className='text-5xl animate-pulse'>Loading</p>
            </div>: 
            listofnews
            }
        </div>
        </>
    )
}



function NewsComponent(props:any){
    // const [isSaved,setSaved] = useState(false);
    
    return (
        <>
        <div className="flex pt-5 pr-5 justify-between items-center">
            <div className="w-12 shrink-0 text-center self-start text-2xl text-gray-700 ">
                <p>{props.id}</p>
            </div>
            <div className="w-full text-gray-500">
                <div className="w-full flex justify-between  text-gray-700 items-center">
                    <p className="text-lg pr-6 text-justify">{props.news?.title??'Headindg'}</p>
                    <p className='shrink-0 self-start' >{(new Date(props.news?.date)).toString().split(/\d\d:\d\d/)[0].split(' ').slice(1).join(' ')}</p>
                </div>
                <div>
                    <p className="text-sm text-justify">{props.news.news??'News details'}</p>

                </div>
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