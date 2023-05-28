export const MovieList = ({
  movies,
  FavoriteComponent,
  handleFavoriteClick,
}) => {
  return (
    <>
      {movies.map((movie, index) => (
        // eslint-disable-next-line react/jsx-key
        <div className='image-container d-inline-flex justify-content-start p-0 m-0 '>
          <img src={movie.Poster} alt=''></img>
          <div
            onClick={() => handleFavoriteClick(movie)}
            className='overlay d-flex align-items-center justify-content-center'
          >
            <FavoriteComponent />
          </div>
        </div>
      ))}
    </>
  )
}
