"use client"
import Navbar from "../navbar";
import '../scrollbar.css'
import { readFileSync, writeFileSync } from "fs";

export default function AddNews() {
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

function AddNewsContent() {
    function addnews(){
        var title = document.getElementsByTagName('textarea')[0].value;
        var content = document.getElementsByTagName('textarea')[1].value;
        if(title!='' && content!=''){
            // read json file
            var newsjson = readFileSync('./app/news/news.json') as any;
            
            var news = {
                date: Date.now(),
                title: title,
                news: content
            }

            newsjson.push(news);
            writeFileSync('./app/news/news.json', JSON.stringify(newsjson));
            alert('News added successfully');

        }
    }
    return (
        <div style={{height:'calc(100vh - 10rem)'}} className=" ">
            <div className='text-2xl text-gray-700 p-2 block text-center underline underline-offset-8'>
                <p>Add News</p>
            </div>
            <div className="mt-5 h-full">
                <form action={addnews}>
                    <textarea  className='w-full flex-wrap text-wrap  bg-white bg-opacity-30 rounded-t-md text-xl text-gray-700 outline-none resize-none py-2 px-5'  placeholder='Title'></textarea> 
                    <textarea className='w-full h-64 bg-white bg-opacity-30 rounded-b-md outline-none text-gray-600 resize-none py-3 px-5' placeholder='Content'></textarea>
                    <input type="submit" value="Submit" className='w-full md:w-auto bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-500 hover:text-gray-400 font-bold py-2 px-4 rounded' />
                </form>
            </div>
        </div>
    )
}