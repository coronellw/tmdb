import React, { Component } from 'react';
import axios from '../axios';
import _ from 'lodash';
import './App.css';

import Movies from '../components/Movies';
import SearchControl from '../components/Movies/SearchControl';

class App extends Component {

  state = {
    genres: [],
    movies: [],
    currentGenre: { id: 28, name: 'Action' },
    search: {
      language: 'en-US',
      sortBy: 'vote_average.desc',
      voteCount: 3000,
      page: 1,
      releaseDate: '2016',
      withGenres: null,
    },
  }

  componentDidMount = () => {
    axios.get('/genre/movie/list')
      .then(response => {
        if (response.data.genres) {
          this.setState({ genres: response.data.genres });
        }
      });
  }

  fetchMovies = () => {
    console.log('[App.js] State: ', this.state);

    axios.get('/discover/movie', {
      params: {
        language: this.state.search.language,
        sort_by: this.state.search.sortBy,
        "vote_gount.gte": this.state.search.voteCount,
        page: this.state.search.page,
        "primary_release_date.gte": this.state.search.releaseDate,
        with_genres: this.state.search.withGenres,
      }
    }).then(response => {
      let movies = response.data.results;
      let currentGenre = _.find(this.state.genres, { id: parseInt(this.state.currentGenre.id, 10) });
      this.setState({ movies, currentGenre });
    }).catch(error => alert('There was an error'));
  }

  changeGenreHandler = (genreId) => {
    let search = this.state.search;
    search.withGenres = genreId;
    let currentGenre = _.find(this.state.genres, { id: parseInt(genreId, 10) })
    console.log('[changeGenreHandler] Found genre ', currentGenre);
    
    this.setState({ search, currentGenre })
    this.fetchMovies();
  }

  changeVoteCountHandler = (event) => {
    let search = this.state.search;
    search.voteCount = event.target.value;
    this.setState({ search })
    this.fetchMovies();
  }

  yearChangedHandler = (event) => {
    let search = this.state.search;
    search.releaseDate = event.target.value;
    this.setState({ search })
    this.fetchMovies();
  }

  changeOrderByHandler = (event) => {
    let search = this.state.search;
    search.sortBy = event.target.value;
    this.setState({ search })
    this.fetchMovies();
  }

  render() {
    return (
      <div className="App">
        <h1>React TMDB Example</h1>

        <SearchControl
          search={this.state.search}
          genre={this.state.currentGenre}
          genres={this.state.genres}
          genreChanged={this.changeGenreHandler}
          orderChanged={this.changeOrderByHandler}
          yearChanged={this.yearChangedHandler}
          voteChanged={this.changeVoteCountHandler}
        />
        <Movies movies={this.state.movies} genres={this.state.genres} />
      </div>
    );
  }
}

export default App;