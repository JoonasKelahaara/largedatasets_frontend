import React from 'react'
import axios from 'axios'
import './App.css'
import {useState, useEffect} from 'react'
import uuid from 'react-uuid'

export default function App() {
  //Muuttujat, joita tarvitaan tiedon näyttämiseen ja hakemiseen
  const url = 'http://localhost/largedatasets/'
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const search = e => {                           //Funktio, jolla lähetetään hakutermi queryparametrinä backendiin ja sillä haetaan tulos
    e.preventDefault();

    if(searchTerm === ''){
      return;
    } else {

    axios.get(url + '/search_by_term.php?search=' + searchTerm  //Osoite + parametri
    ).then((response) => {
      const json = response.data;
      console.log(json);
      setResults(json);                                         //Asetetaan tulos taulukkoon
    }). catch(e => console.log(e))
  }}

  return (
    <div className="container">
      <h2>Find movies based on search terms</h2>
      <label className="myForm label-text">Insert search term: </label>
      <input className="myForm" onChange={(e => {setSearchTerm(e.target.value)})}                              /* Hakukenttään kirjoitetaan hakusana, joka lähtee backendiin */
      name="search" placeholder="genre, name..." />                                         {/* useState muuttuu seSearchTermin perusteella inputin valueen katsoen */}
      <button className="myForm" onClick={search}>Search</button>                                              
      <div>
        <ul>
        {results.map(item => (
          <li key={uuid()}>Title: {item.primary_title}<br /> Genre: {item.genre}</li>       /* Axioksella saatu taulukko mapataan listaan, jotta ne olisivat helpommin luettavissa */
        ))}                                                                                 {/* vrt. JSON (hankala) vs HTML lista (selkeä) */}
        </ul>
      </div>
    </div>
  )
}
