"use client"
import assets from './images';
import './navbar.css'
import { useState } from "react"

export default function Navbar(){

    const [collapsed, setCollapsed] = useState(true);

    function collapseToggle(){
        var d = document.getElementById('menu')
        var b = document.getElementById('menubutton')
        if(collapsed==false) {
            d?.classList.remove('w-36')
            d?.classList.add('w-0')
            setCollapsed(true)
        }else {
            d?.classList.remove('w-0')
            d?.classList.add('w-36')
            setCollapsed(false)
        }
    }

    
    return (
        <div style={{zIndex:1000}} className="  w-full ">
            <nav className="h-20 flex justify-between md:items-center">
                <div className='self-center'>
                    <img className=" h-16 text-gray-600 " alt='softrec logo' 
                    src={assets.images.logo.src} />
                </div>
                <p className='text-5xl self-center md:justify-end text-gray-600'>SOFTREC</p>
                <div className='flex h-full'>
                    
                    <div className="overflow-hidden  transition-all w-0 my-16 md:m-2 absolute md:static  right-0 md:w-auto  bg-gray-400 rounded-s-md md:rounded-md " id="menu">
                        <ul className={"flex flex-col text-right md:text-center md:flex-row justify-end text-gray-600 "}>
                            <li className={"m-5 "}><a href="#">Home</a></li>
                            <li className={"m-5 "}><a href="#">About us</a></li>
                            <li className={"m-5 "}><a href="#">Events</a></li>
                            <li className={"m-5 "}><a href="#">Members</a></li>
                            <li className={"m-5 "}><a href="#">Alumni</a></li>
                            <li className={"m-5 "}><a href="#">Updates</a></li>
                            <li className={"m-5 "}><a href="#">Login</a></li>
                        </ul>
                    </div>
                    <div className="self-center md:hidden">
                        <button id="menubutton" onClick={collapseToggle} className="m-5 font-bold text-2xl text-right text-gray-600">
                        &#x2630;
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}