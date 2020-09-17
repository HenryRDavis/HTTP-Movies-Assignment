import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from './Movies/AddMovie'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

    <Switch>

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>
    
      <Route path="/update-movie/:id"
      render={props => <UpdateMovie moviesList={movieList}/>}
      >
        <UpdateMovie moviesList={movieList}/>
      </Route>

      <Route path='/add-movie'>
        <AddMovie  />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} moviesList={movieList}
        />
      </Route>

    </Switch>

    </>
  );
};

export default App;
