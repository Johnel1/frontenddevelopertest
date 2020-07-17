import React from 'react';
import { useSelector } from "react-redux";
// import './index.scss';
import PopularStarships from './PopularStarships';
import PopularPlanets from './PopularPlanets';
import PopularCharacters from './PopularCharacters';

function HomePage() {
  const people = useSelector(state => state.people);
  const planet = useSelector(state => state.planet);
  const starships = useSelector(state => state.starships);

  return (
    <main id="main">
      <PopularStarships starships={starships.starshipsList} />
      <PopularPlanets planet={planet.planetsList} />
      <PopularCharacters people={people.peopleList} />
    </main>
  )
}

export default HomePage;