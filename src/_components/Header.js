import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import logo from '../_assets/logo.png';
import './header.scss';
import character1 from '../_assets/character-1.jpg';
import starShip1 from '../_assets/starship-2.jpg';
import planet1 from '../_assets/planet-1.jpg';
import {peopleActions, starshipsActions} from '../_actions';

function Header({location}) {
  const [searchValue, setSearchValue] = useState('');
  const dispatch =  useDispatch();
  const {pathname} = location;

  const handleSearch = () => {
    if(pathname === '/starship') {
      dispatch(starshipsActions.searchStarship({searchValue}));
    } else if(pathname === '/character') {
      dispatch(peopleActions.searchPerson({searchValue}));
    }
  }

  return (     
    <div>
      <header id="header">
        <a href="/"><img src={logo} alt="" width='100' height='50' /></a>
      </header>
      {
        (pathname === '/starshipdetails') ?
        <section id="hero">
          <div class="hero-container">
            <img src={starShip1} width='50%' height='50%' alt=""/>            
          </div>
        </section>
        :
        (pathname === '/planetdetails') ?
        <section id="hero">
          <div class="hero-container">
            <img src={planet1} width='50%' height='50%' alt=""/>            
          </div>
        </section>
        :
        (pathname === '/characterdetails') ?
        <section id="hero">
          <div class="hero-container">
            <img src={character1} width='50%' height='50%' alt=""/>            
          </div>
        </section>
        :
        <section id="hero">
          <div class="hero-container">
            <h1 style={{textDecoration: 'underline'}}><img src={logo} alt="" width='100' height='60' /><strong>  Directory</strong></h1>
            <h6>Find your favourite characters, films, species,<br/> starships and planets </h6>
            <div class='search-box'>
              <button onClick={handleSearch} type="submit"><i class="fa fa-search"></i></button>
              <input onChange={(event) => setSearchValue(event.target.value)} class='search' value={searchValue} type="text" name="name" placeholder='Enter a search term' />
            </div>
          </div>
        </section>
      }     
    </div>      
  );
}

export default Header;