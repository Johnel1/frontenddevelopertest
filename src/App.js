import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Route, Switch, withRouter} from 'react-router-dom';
import Footer from './_components/Footer';
import Header from './_components/Header';
import HomePage from './Pages/Home';
import {peopleActions, planetActions, starshipsActions} from './_actions';

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


  return (
    <div>
      <Header 
        location={location}
      />       
        <Switch>
          <Route exact path="/" component={HomePage} />      
        </Switch>
      <Footer/> 
    </div>
  );
}

export default withRouter(App);