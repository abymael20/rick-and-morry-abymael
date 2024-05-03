import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'

const NavigationButtons: React.FC = () => {
  return (
    <div>
 <h1>Explore the universe of Rick and Morty</h1>
      <button id="locaisButton">
        <Link to="/app">Locais</Link>
      </button>
      <button id="episodiosButton">
        <Link to="/episodes">Episódios</Link>
      </button>

      <div className='Descricao'>
        Welcome to our website dedicated to providing insights into the fascinating world of "Rick and Morty". Dive into the universe of this beloved series where we offer detailed information on various locations featured throughout the show, complete with dimensions and their significance within the multiverse. Additionally, explore a comprehensive collection of episodes, each accompanied by its release date and captivating title. Join us as we embark on an adventure through space, time, and the eccentricities of Rick Sanchez and his trusty sidekick, Morty Smith.
      </div>
    </div>
  );
}

export default NavigationButtons;