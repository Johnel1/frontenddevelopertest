import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import logo from '../_assets/logo.png';
import './header.css';
import character1 from '../_assets/character-1.jpg';
import starShip1 from '../_assets/starship-2.jpg';
import planet1 from '../_assets/planet-1.jpg';
import {peopleActions, starshipsActions} from '../_actions';

function Header({location}) {
  const [searchValue, setSearchValue] = useState('');
  const [showBg, setShow] = useState(false)
  const dispatch =  useDispatch();
  const details = useSelector(state => state.details);
  const {resultDetails} = details;

  const {pathname} = location;

  useEffect(()=>{
    const listScroll = e =>{
      window.onscroll =()=>{
        //const nav = document.querySelector('#mainNav');
        if(window.scrollY >400){
          setShow(true)
        }
        if(window.scrollY <400){
          setShow(false)
        }
    }
    
    }
    window.addEventListener("scroll",listScroll)

    return () =>{
      window.removeEventListener("scroll",listScroll)
    }
  },[]);

  const handleSearch = () => {
    if(pathname === '/starship') {
      dispatch(starshipsActions.searchStarship({searchValue}));
    } else if(pathname === '/character') {
      dispatch(peopleActions.searchPerson({searchValue}));
    }
  }

  return (     
    <div>
      <header style={{backgroundColor: showBg ? 'black' : 'transparent', width: '100%'}} id="header">
        <a href="/"><img src={logo} alt="" width='100' height='50' /></a>
      </header>
      {
        (pathname === '/starshipdetails') ?
        <section id="hero">
          <div class="hero-container">
            <img src={starShip1} width='50%' height='50%' alt=""/>    
            <h2 class="name">{resultDetails && resultDetails.name}</h2>                  
          </div>
        </section>
        :
        (pathname === '/planetdetails') ?
        <section id="hero">
          <div class="hero-container">
            <img src={planet1} width='50%' height='50%' alt=""/>   
            <h2 class="name">{resultDetails && resultDetails.name}</h2>                   
          </div>
        </section>
        :
        (pathname === '/characterdetails') ?
        <section id="hero">
          <div class="hero-container">
            <img src={character1} width='50%' height='50%' alt=""/>  
            <h2 class="name">{resultDetails && resultDetails.name}</h2>          
          </div>
        </section>
        :
        <section id="hero">
          <div class="hero-container">
            <h1 style={{textDecoration: 'underline'}}><img src={logo} alt="" width='100' height='60' /><strong>  Directory</strong></h1>
            <h4>Find your favourite characters, films, species,<br/> starships and planets </h4>
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