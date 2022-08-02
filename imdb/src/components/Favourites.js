import React, { useState, useEffect } from 'react'
import Pagination from './Pagination';


function Favourites() {
  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
  }
  const [currGenere, setCurGenere] = useState('All Generes');

  const [favourites, setFavourites] = useState([]);
  const [genres, setGenres] = useState([]); // empty array of genres

  const [ratings, setRatings] = useState(0)
  const [popularity, setPopularity] = useState(0)

  const [search, setSearch] = useState("")
  const [rows, setRows] = useState(5)
  const [currPage, setCurPage] = useState(1)

  // for getting favourites movies from local storage
  useEffect(() => {
    // it will run  every time when page reloads
    let oldFav = localStorage.getItem("imdb"); // it will return a string of Local storage which have name imdb
    oldFav = JSON.parse(oldFav) || []; // convert string to array || is it doesn't get anything then empty array
    setFavourites([...oldFav]); // it will set to favourites
  }, [])

  // for genres get -> build those blue/grey buttons
  useEffect(() => {
    let temp = favourites.map((movie) => genreids[movie.genre_ids[0]]) // One movies can have multiple genre, so we are taking [0] genre , temp array => will store the genere of favourite movies  
    console.log(temp)
    temp = new Set(temp) // Set =>  it will store genre of unique value, to prevent repetition of same genre buttons
    setGenres(["All Genres", ...temp]) // save it in state
  }, [favourites])

  let del = (movie) => { // for removal of movies from favourites and local storage
    let newArray = favourites.filter((m) => m.id != movie.id) // it will filtered out movies whose movies.id is not equal
    setFavourites([...newArray])
    localStorage.setItem("imdb", JSON.stringify(newArray))
  }

 

// filtering
  let filteredMovies = []

  filteredMovies = currGenere == "All Genres" ? favourites : favourites.filter((movie) => genreids[movie.genre_ids[0]] == currGenere) // filtering of movies then Basis of Genres Selected

    // sorting
  if(ratings == 1) { // sorting on Rating
    filteredMovies = filteredMovies.sort(function(objA, objB) { // takes 2 object and sort on the basis of ratings
      return objA.vote_average - objB.vote_average; //  vote_average => key type inbuilt in React
    })
  } else if(ratings == -1) {
    filteredMovies = filteredMovies.sort(function(objA, objB) {
      return objB.vote_average - objA.vote_average
    })
  }

  if(popularity == 1) { // sorting on Rating
    filteredMovies = filteredMovies.sort(function(objA, objB) { // takes 2 object and sort on the basis of ratings
      return objA.popularity - objB.popularity; //  popularity => key type inbuilt in React
    })
  } else if(popularity == -1) {
    filteredMovies = filteredMovies.sort(function(objA, objB) {
      return objB.popularity - objA.popularity
    })
  }

  // searching 
  filteredMovies = filteredMovies.filter((movie)=>
    movie.title.toLowerCase().includes(search.toLowerCase()) // it will search in lower case letters too
  )

  //pagination
  let maxPage = Math.ceil(filteredMovies.length / rows);
  let si = (currPage - 1) * rows;
  let ei = Number(si) + Number(rows)

  filteredMovies = filteredMovies.slice(si, ei)

  //pagination components ko me goback and goAhead function dene k liye
  let goBack = () => {
    if(currPage>1){
      setCurPage(currPage-1)
    }
  }

  let goAhead = () => {
    if(currPage < maxPage){
      setCurPage(currPage+1)
    }
  }

  return (
    <>
      <div className="mt-2 px-2 flex justify-center flex-wrap space-x-2">
      {
        genres.map((genre) =>
        <button className={currGenere == genre ? 'm-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold' : 'm-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'}
        onClick={() =>{
          setCurPage(1)
          setCurGenere(genre)
        }
       }
        >
          {genre}</button>

        )
      }
        
        {/*<button className={currGenere == "Action" ? 'm-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold' : 'm-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'}>Action</button> */}

      </div>
      <div className='flex justify-center'>
        <input placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} type='text' className='border border-2 rounded-lg m-2 text-center p-2 ' />
        <input placeholder="Rows" type='number'value={rows} onChange={(e)=>setRows(e.target.value)} className='border border-2  rounded-lg m-2 text-center p-2' /> 
      </div>
      {/*<div>Input Container </div>
  <div>Table Container </div>*/}
      <div className="flex flex-col m-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    ><div className="flex"><img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' className='mr-2 cursor-pointer' 
                    onClick={()=>{
                      setPopularity(0)
                      setRatings(-1)
                    }}
                     />
                        Rating
                        <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png' className='ml-2 cursor-pointer' 
                        onClick={()=>{
                          setPopularity(0)
                          setRatings(1)
                        }}
                        />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className='flex'><img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' className='mr-2 cursor-pointer' 
                      onClick={()=>{
                        setRatings(0)
                        setPopularity(-1)
                      }}
                      />
                        Popularity
                        <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png' className='ml-2 cursor-pointer' 
                        onClick={()=>{
                          setRatings(0)
                          setPopularity(1)
                        }}
                        />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Genre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMovies.map(movie => (
                    <tr key={movie.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                            <img className="hidden md:block md:h-[100px] md:w-[180px]" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 font-bold">{movie.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{movie.vote_average}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{movie.popularity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {genreids[movie.genre_ids[0]]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        <button href="#" className="text-red-600 hover:text-red-900"
                          onClick={() => del(movie)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/*<div>Pagination </div>*/}
      <div className='mt-4'>
        <Pagination pageProp={currPage} goBack={goBack} goAhead={goAhead} />
      </div>
    </>
  )
}

export default Favourites