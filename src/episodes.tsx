import { useEffect, useState } from "react";
import { PageableEpisodesType } from "./types/episodes.type";
import { axiosClient } from "./api/axios";
import { Link } from 'react-router-dom';
import './App.css'

function episodes(){
    const [isLoading, setIsLoading] = useState(false);
    const [episodes, setEpisodes] = useState<PageableEpisodesType>();
    const [nameFilter, setNameFilter] = useState("");
    const [episodesFilter, setEpisodesFilter] = useState("");
 
    async function getAllLocal() {
        setIsLoading(true);
        await axiosClient
          .get<PageableEpisodesType>(`/episode`)
          .then((request) => {
            setEpisodes(request.data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
      useEffect(() => {
        getAllLocal();
      }, []);
    
      async function handlePaginateEpisodes(url: string) {
        setIsLoading(true);
        await axiosClient
          .get<PageableEpisodesType>(url)
          .then((request) => {
            setEpisodes(request.data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    
      async function handleFilterEpisodes() {
        setIsLoading(true);
        await axiosClient
          .get<PageableEpisodesType>(`https://rickandmortyapi.com/api/episode/?name=${nameFilter}&episode=${episodesFilter}`)
          .then((request) => {
            setEpisodes(request.data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
      
      return (
        <div className="episodes-container">
        <div className="episodes">
          <h1>Episodes from the series</h1>
  
          {isLoading ? (
            <span className="message">Loading...</span>
          ) : !episodes ? (
            <span className="message">No items to show...</span>
          ) : (
            <>
              <form className="filter-episodes" onSubmit={handleFilterEpisodes}>
                <span><strong> Episode name: </strong></span>
                <input type="text" onChange={(event) => setNameFilter(event.target.value)} />
                <span><strong>  Number: </strong></span>
                <input type="text" onChange={(event) => setEpisodesFilter(event.target.value)} />
                <button type="submit" disabled={!nameFilter && !episodesFilter}>
                  Filter
                </button>
              </form>
  
              <div className="episode-list">
                {episodes.results.map((episode) => (
                  <div className="episode" key={episode.id}>
                    <span className="episode-season">Episode and season: <strong>{episode.episode}</strong></span>
                    <span className="episode-name">Episode name: <strong>{episode.name}</strong></span>
                    <span className="episode-date">Episode date: <strong>{episode.air_date}</strong></span>
                  </div>
                ))}
              </div>
  
              <div className="pagination">
                <button
                  onClick={() => handlePaginateEpisodes(episodes.info.prev)}
                  disabled={!episodes.info.prev}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePaginateEpisodes(episodes.info.next)}
                  disabled={!episodes.info.next}
                >
                  Next
                </button>
              </div>
  
              <div className="back-button">
                <button>
                  <Link to="/">Back</Link>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
    }
    
    export default episodes;
    