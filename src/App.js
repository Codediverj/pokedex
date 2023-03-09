import axios from "axios";
import React, { useEffect, useState } from "react";
import './App.css';
import Footer from './components/CommonArea/Footer.js';
import Header from './components/CommonArea/Header.js';
import CardList from './components/Cards/CardsList';

const App = () => {
  const [pokeData, setPokeData] = useState([]);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPokemonsData = async () => {
    setLoading(true);
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    const res = await axios.get(url);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    res.map(async (it) => {
      const result = await axios.get(it.url)
      setPokeData(state => {
        state = [...state, result.data]
        return state;
      })
    })
  }
  useEffect(() => {
    getPokemonsData();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
  };

  return (
    <div className="App">
      <Header
        pokemon={pokeData}
        handleSearch={handleSearch}
      />
      {!loading && pokeData ? (
        <CardList pokemon={pokeData} search={search} />
      ) : null}
      <Footer />
    </div>
  );
}

export default App;
