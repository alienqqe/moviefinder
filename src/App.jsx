import { useEffect, useLayoutEffect, useState } from 'react'
import { MovieList } from './components/MovieList'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import { MovieHeader } from './components/MovieHeader'
import { Search } from './components/Search'
import { AddFavorite } from './components/AddFavorite'
import { RemoveFavorites } from './components/RemoveFavorites'

function App() {
  const [movies, setMovies] = useState([])
  const [value, setValue] = useState('')
  const [favorites, setFavorites] = useState([])

  const getMovieRequest = async () => {
    const url = `https://www.omdbapi.com/?s=${value}&apikey=aca85626`

    const response = await fetch(url)
    const responseJson = await response.json()

    console.log(movies)
    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  }

  useEffect(() => {
    getMovieRequest(value)
  }, [value])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('moviefinder-favorites', JSON.stringify(items))
  }

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem('moviefinder-favorites')
    )

    if (movieFavorites) {
      setFavorites(movieFavorites)
    }
  }, [])

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie]
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    )
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-5'>
        <MovieHeader
          heading='MovieFinder'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-camera-reels '
              viewBox='0 0 16 16'
            >
              <path d='M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z' />
              <path d='M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z' />
              <path d='M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z' />
            </svg>
          }
        />
        <Search value={value} setValue={setValue} />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          FavoriteComponent={AddFavorite}
          handleFavoriteClick={addFavoriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieHeader heading='Favorites' />
      </div>
      <div className='row'>
        <MovieList
          movies={favorites}
          FavoriteComponent={RemoveFavorites}
          handleFavoriteClick={removeFavoriteMovie}
        />
      </div>
    </div>
  )
}

export default App
