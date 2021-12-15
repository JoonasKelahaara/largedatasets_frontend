import React from 'react'
import axios from 'axios'
import './App.css'
import {useState, useEffect} from 'react'
import uuid from 'react-uuid'

export default function App() {
  //Muuttujat, joita tarvitaan tiedon näyttämiseen ja hakemiseen
  const url = 'http://localhost/largedatasets/'
  const [searchTerm, setSearchTerm] = useState('');
  const [radioSearch, setRadioSearch] = useState('');
  const [results, setResults] = useState([]);
  const [viewResults, setViewResults] = useState([]);

  const search = e => {                           //Funktio, jolla lähetetään hakutermi queryparametrinä backendiin ja sillä haetaan tulos
    e.preventDefault();

    if(searchTerm === ''){                        //Jos hakuehtoa ei ole asetettu, niin ei haeta mitään
      return;
    } else {

    axios.get(url + '/search_by_term.php?search=' + searchTerm  //Osoite + parametri
    ).then((response) => {
      const json = response.data;
      console.log(json);
      setResults(json);                                         //Asetetaan tulos taulukkoon
      setViewResults([]);
    }).catch(e => console.log(e))
  }}

  const radio = e => {
    e.preventDefault();

    axios.get(url + '/radio.php?search=' + radioSearch
    ).then((response) => {
      const json = response.data;
      setResults(json);
    }).catch(e => console.log(e))
  }

  const fi_movies = e => {
    e.preventDefault();

    axios.get(url + '/finnish.php'
    ).then((response) => {
      const json = response.data;
      setViewResults(json);
      setResults([]);
    }).catch(e => console.log(e))
  }

  const gb_movies = e => {
    e.preventDefault();

    axios.get(url + '/english.php'
    ).then((response) => {
      const json = response.data;
      setViewResults(json);
      setResults([]);
    }).catch(e => console.log(e))
  }

  return (
    <div className="container">
      <h2>Find movies based on search terms</h2>
      <label className="myForm label-text">Insert search term: </label>
      <input className="myForm" onChange={(e => {setSearchTerm(e.target.value)})}                              /* Hakukenttään kirjoitetaan hakusana, joka lähtee backendiin */
      name="search" placeholder="Movie name or a part of it" />                                         {/* useState muuttuu seSearchTermin perusteella inputin valueen katsoen */}
      <button className="myForm" onClick={search}>Search</button>  
      <div className="col-12">
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Action" 
          onChange={e => setRadioSearch(e.target.value)} />
          <label className="form-check-label" >Action</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Animation"
          onChange={e => setRadioSearch(e.target.value)}  />
          <label className="form-check-label" >Animation</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Comedy"
          onChange={e => setRadioSearch(e.target.value)}  />
          <label className="form-check-label" >Comedy</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Crime"
          onChange={e => setRadioSearch(e.target.value)}  />
          <label className="form-check-label" >Crime</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Documentary"
          onChange={e => setRadioSearch(e.target.value)}  />
          <label className="form-check-label" >Documentary</label>
        </div>
      </div>
      <div>
        <button className="funbutton" onClick={radio}>Search by genre</button>
      <h2>Fun buttons for different uses</h2>
        <button className="funbutton" onClick={fi_movies}>10 Finnish movies</button>      
        <button className="funbutton" onClick={gb_movies}>10 English movies</button>  
      </div>                         
      <ul className="main">
        <ul className="col-3">
        {results.map(item => (
          <li key={uuid()}>Title: {item.primary_title}<br /> {/* Axioksella saatu taulukko mapataan listaan, jotta ne olisivat helpommin luettavissa */}
          Genre: {item.genre}<br />                               {/* vrt. JSON (hankala) vs HTML lista (selkeä) */}
          Start year: {item.start_year}
          </li>                            
        ))}                             
        </ul>
        <ul className="col-3">
          {viewResults.map(item => (
            <li key={uuid()}>
              Title: {item.title}<br />
              Genre: {item.genre}<br />
              Start year: {item.start_year}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  )
}
