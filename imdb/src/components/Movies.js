import React, { useState, useEffect } from 'react'
import Image from '../banner.jpg'
import axios from 'axios';
import { Oval } from 'react-loader-spinner'
import Pagination from './Pagination';

function Movies() {

    const [movies, setMovies] = useState([]) // array used to collect movies from backend api 
    const [pageNumber, setPage] = useState(1);
    const [hover, setHover] = useState('');
    const [favourites, setFavourites] = useState([])

    function goAhead() {
        setPage(pageNumber + 1);
    }
    function goBack() {
        if (pageNumber > 1) {
            setPage(pageNumber - 1);
        }
    }
    useEffect(function() {
        // it will run  every time when page reloads
        let oldFav = localStorage.getItem("imdb"); // it will return a string of Local storage which have name imdb
        oldFav = JSON.parse(oldFav) || []; // convert string to array
        setFavourites([...oldFav]); // it will set to favourites

        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=5c1d2ae64af71d54618f677b6890b38c&page=${pageNumber}`).then((res) => {
            console.table(res.data.results)
            setMovies(res.data.results)
            
        } 
        
        )
    }, [pageNumber])

    let add = (movie) => {
            let newArray = [...favourites, movie]
            setFavourites([...newArray]) // set in the state
            console.log(newArray)
            localStorage.setItem("imdb", JSON.stringify(newArray)) // it will set data to local storage in string format
    }

    let del = (movie) => { // for removal of movies from favourites and local storage
        let newArray = favourites.filter((m) => m.id != movie.id) // it will filtered out movies whose movies.id is not equal
        setFavourites([...newArray])
        localStorage.setItem("imdb", JSON.stringify(newArray))
    }

    return (
        <>
            <div className="mb-8 text-center">
                <div className="mt-8 mb-8 font-bold text-2xl text-center">Trending Movies </div>
                {
                    movies.length == 0 ?
                        <div className = "flex justify-center">
                            <Oval
                                height="100"
                                width="100"
                                color="grey"
                                secondaryColor='grey'
                                ariaLabel='loading'
                            /></div> :

                        <div className="flex flex-wrap justify-center">
                        {
                            //Dynamically movies wiil be displayed on UI 
                            movies.map((movie) => (
                                <div className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] md:h-[30vh] md:w-[250px] h-[25vh] w-[150px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 relative`}
                                onMouseEnter={() =>{setHover(movie.id)
                                    console.log(movie.id)
                                }}
                                onMouseLeave={() =>setHover("")}
                                >
                                {
                                    hover == movie.id && <>{
                                        favourites.find((m) => m.id == movie.id) ? <div className='absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer ' onClick={() => del(movie)}>❌</div> :   <div className='absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer ' onClick={() => add(movie)}>🤩</div>
                                    }
                                    
                                    </>
                                }

                                

                                <div className="w-full bg-gray-900 text-white py-2 text-center rounded-b-xl font-bold">{movie.title} </div>
                            </div>
                            ))
                        }
                        </div>
                }
            </div>
            <Pagination pageProp={pageNumber} goBack={goBack} goAhead={goAhead}/>
        </>
    )
}

export default Movies;