import { useState,useEffect } from "react";
const key = "ab8e48f9";

export function useMovies(query,callback) {
    
      const [movies, setMovies] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState("");
  useEffect(
      
      function () {
        callback?.()
      const controller = new AbortController();

      async function fetchMovie() {
        try {
          setIsLoading(true);
          setError("");
          const response = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!response.ok)
            throw new Error("Something went wrong while fetching the movies.");

          const data = await response.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovie();
      return () => controller.abort();
    },
    [query]
  );
  return {movies,isLoading,error}
}
