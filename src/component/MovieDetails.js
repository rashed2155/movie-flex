import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainImage from "./MainImage";
import MovieInfo from "./MovieInfo";

const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";
const IMAGE_SIZE = "w1280";

// const FEATURED_API =
//   "https://api.themoviedb.org/3/movie/464052?api_key=23bffabfa709b9579baf869e0d369bc3";

function MovieDetails() {
  let { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);

  useEffect(() => {
    let endpointForMovieInfo = `https://api.themoviedb.org/3/movie/${id}?api_key=23bffabfa709b9579baf869e0d369bc3`;
    fetchDetailInfo(endpointForMovieInfo);
  }, [id]);

  const fetchDetailInfo = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setMovies(result);
        setLoadingForMovie(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <div>
        {!LoadingForMovie ? (
          <MainImage
            image={`${IMAGE_BASE_URL}${IMAGE_SIZE}/${movies.backdrop_path}`}
            title={movies.original_title}
            text={movies.overview}
          />
        ) : (
          <div>loading...</div>
        )}
      </div>
      <div>
        {!LoadingForMovie ? (
          <MovieInfo movie={movies} />
        ) : (
          <div>loading...</div>
        )}
      </div>
      <footer>
      Developed by{" "}
      <a
        style={{ color: "#1A8DDE", textDecoration: "none" }}
        href="https://rashed-abir.web.app/"
      >
        Rashed Abir
      </a>
    </footer>
    </div>
  );
}

export default MovieDetails;
