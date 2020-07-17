import React from 'react';
import './character.css';
import character1 from '../_assets/character-1.jpg';
import { Link } from 'react-router-dom'

function Character({row}) {

  return (
    <div id='character'>
      <div class='character'>
      <div class='image'>
        <img src={character1} width='100%' height='100%' alt=""/>
      </div>
      <div class='description'>
        <h2 class="title">{row && row.name}</h2>
        <p class="title">{row && row.birth_year}</p>
        <p>{row && row.gender}</p> 
        <Link 
          class="characterbutton" 
          to={
            { 
              pathname: `/characterdetails`,
              myCustomProps: row && row.url
            }
          }
        >
          Read More
        </Link>      
      </div>
      </div>
    </div>
  )
}

export default Character;