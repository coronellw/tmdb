import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../axios';
import './App.css';

import Movies from '../components/Movies';
import Person from '../components/Person/Person';
import FullMovie from '../components/Movies/FullMovie/FullMovie';
import SearchControl from '../components/Movies/SearchControl';

import {
  setGenres,
} from '../store/actions/actionCreators';

class App extends Component {

  componentDidMount = () => {
    axios.get('/genre/movie/list')
      .then(response => {
        if (response.data.genres) {
          this.props.onGenresUpdate(response.data.genres)
        }
      });
  }

  render() {
    return (
      <div className="App">
        <h1>React TMDB Example</h1>
        <SearchControl />
        <Switch>
          <Route path="/" exact component={Movies} />
          <Route path="/movie/:id" component={FullMovie} />
          <Route path="/person/:id" component={Person} />
          <Route render={() => <h1>Page not found!!!</h1>} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    selectedMovie: state.currentMovie,
    genres: state.genres,
    selectedGenre: state.selectedGenre,
    search: state.search
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onGenresUpdate: (genres) => { dispatch(setGenres(genres)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);