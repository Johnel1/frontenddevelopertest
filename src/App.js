import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Route, Switch, withRouter} from 'react-router-dom';
import Footer from './_components/Footer';
import Header from './_components/Header';
import HomePage from './Pages/Home';
import StarwarCharactersPage from './Pages/StarwarCharacter';
import StarwarShipsPage from './Pages/StarwarShip';
import StarshipDetailsPage from './Pages/Details/Starship';
import PlanetDetailsPage from './Pages/Details/Planet';
import CharacterDetailsPage from './Pages/Details/Character';
import {peopleActions, planetActions, starshipsActions} from './_actions';
import './App.css';

function App({location}) {

  const dispatch =  useDispatch();

  const people = useSelector(state => state.people);
  const planet = useSelector(state => state.planet);
  const starships = useSelector(state => state.starships);

  useEffect((model={}) => {
    dispatch(peopleActions.getPeople(model));
    dispatch(planetActions.getPlanets(model));
    dispatch(starshipsActions.getStarships(model));

  }, []);

  const {IsRequestingPeople} = people;
  const {IsRequestingPlanets} = planet;
  const {IsRequestingStarships} = starships;


  return (
    <div>
      <Header 
        location={location}
      />
        {
          (IsRequestingPeople || IsRequestingPlanets || IsRequestingStarships) ?
          <div class="loader"></div>
        :
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route  path="/character" component={StarwarCharactersPage} />
          <Route  path="/starship" component={StarwarShipsPage} />
          <Route  path="/characterdetails" component={CharacterDetailsPage} />
          <Route  path="/planetdetails" component={PlanetDetailsPage} />
          <Route  path="/starshipdetails" component={StarshipDetailsPage} />   
      
        </Switch>
        }
      <Footer/> 
    </div>
  );
}

export default withRouter(App);