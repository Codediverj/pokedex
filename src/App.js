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
    const promises = res.data.results.map(async (it) => {
      const result = await axios.get(it.url);
      return result.data;
    });
    const pokeData = await Promise.all(promises);
    pokeData.sort((a, b) => a.id - b.id);
    setPokeData(pokeData);
    setLoading(false);
  };

  useEffect(() => {
    getPokemonsData();
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
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <CardList pokemon={pokeData} search={search} />
      )}
      <Footer />
    </div>
  );
}

export default App;
