import React, { Component } from 'react';
import './App.css';

import * as api from '../assets/config'
import Movies from '../components/Movies';
import Genres from '../components/Genres';

class App extends Component {

  state = {
    genres:[],
    movies:[],
    currentGenre:null
  }

  componentDidMount = () => {
    let self = this;
    let query = api.URL+'/genre/movie/list?api_key='+api.KEY;
    console.log(query);
    fetch(query)
      .then( response => response.json() )
      .then( json => {
        self.setState({genres: json.genres});
      } );
  }

  handleGenreClicked = (genreId) => {
    let self = this;
    let query = api.URL+'/discover/movie?api_key='+api.KEY
      +'&language=en-US&sort_by=vote_average.desc&vote_count.gte=3000&page=1&release_date.gte=2000&with_genres='
      +genreId;
    console.log('using URL: '+query);
    fetch(query)
    .then( response => response.json() )
    .then( json => {
      console.log(json);
      let movies = json.results;
      let currentGenre = self.state.genres.find(g => g.id ===genreId);
      self.setState({movies, currentGenre})
    });
  }

  render() {
    let searchActive=null;
    if (this.state.currentGenre!==null) {
      searchActive=<p>Showing results for {this.state.currentGenre.name}</p>
    }
    return (
      <div className="App">
        <h1>React TMDB Example</h1>
        <hr />
        <Genres genres={this.state.genres} clicked={this.handleGenreClicked} />
        <hr />
        {searchActive}
        <Movies movies={this.state.movies} />
      </div>
    );
  }
}

export default App;