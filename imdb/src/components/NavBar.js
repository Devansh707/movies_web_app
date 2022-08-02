import React from 'react';
import Logo from "../logo.png";
import {Link} from 'react-router-dom';

function NavBar() {
    return <>
        <div className="h-27 border pl-12 flex space-x-8 items-center py-4">
            <img src={Logo} className = "w-[50px] md:w-[60px]"></img> 
            <Link to="movies" className="text-blue-400 font-bold text-xl md:text-3xl"> Movies</Link>
            <Link to ="favourites" className="text-blue-400 font-bold text-xl md:text-3xl"> Favourite </Link>
        </div>
    </>
}

export default NavBar;