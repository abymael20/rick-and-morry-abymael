import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosClient } from './api/axios';
import './App.css';
import { PageableLocalType } from './types/character.type';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [local, setLocal] = useState<PageableLocalType | null>(null);
  const [localFilter, setLocalFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  async function getAllLocal() {
    setIsLoading(true);
    try {
      const response = await axiosClient.get<PageableLocalType>('/location');
      setLocal(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllLocal();
  }, []);

  async function handlePaginateLocal(url: string) {
    setIsLoading(true);
    try {
      const response = await axiosClient.get<PageableLocalType>(url);
      setLocal(response.data);
    } catch (error) {
      console.error('Error paginating Local:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFilterLocal(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosClient.get<PageableLocalType>(
        `https://rickandmortyapi.com/api/location/?name=${localFilter}&type=${typeFilter}`
      );
      setLocal(response.data);
    } catch (error) {
      console.error('Error filtering Local:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="Location">
      <h1>Locations from the series</h1>
      {isLoading ? (
        <span className="message">Loading...</span>
      ) : !local ? (
        <span className="message">No items to show...</span>
      ) : (
        <>
          <form className="filterslocal" onSubmit={handleFilterLocal}>
            <span><strong>Location: </strong></span>
            <input type="text" value={localFilter} onChange={(event) => setLocalFilter(event.target.value)} />
            <span><strong> Type: </strong></span>
            <input type="text" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} />
            <button type="submit" disabled={!localFilter && !typeFilter}>
              Filter
            </button>
          </form>

          <div className="Local">
            {local.results.map((location) => (
              <div className="LocationCard" key={location.id}>
                <span className="LocationName">Location: <strong>{location.name}</strong> </span>
                <span className="LocationDimension">Located in dimension: <strong>{location.dimension}</strong> </span>
                <span className="LocationType">It is a: <strong>{location.type}</strong> </span>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button onClick={() => handlePaginateLocal(local.info.prev)} disabled={!local.info.prev}>
              Previous
            </button>
            <button onClick={() => handlePaginateLocal(local.info.next)} disabled={!local.info.next}>
              Next
            </button>
          </div>

          <div className="Back">
            <button>
              <Link to="/">Back</Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
