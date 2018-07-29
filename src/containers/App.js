import React, { Component } from 'react';
import './App.css';

import * as api from '../assets/config'
import Movies from '../components/Movies';
import Genres from '../components/Genres';

class App extends Component {

  state = {
    persons: [
      { id: 1, name: 'Wiston', age:35 },
      { id: 2, name:'Diana', age:30 },
      { id: 3, name:'Isaac', age:0 }
    ],
    genres:[],
    movies:[],
    showPersons: false
  };

  togglePersonsHandler = () => {
    this.setState({showPersons: !this.state.showPersons});
  }

  nameChangedHandler = (event, personId) => {
    this.setState({
      persons: this.state.persons.map(p=>{
        if (p.id===personId) {
          p.name = event.target.value;
        }
        return p;
      })
    })
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons =[...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons});
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
      +'&language=en-US&sort_by=vote_average.desc&vote_count.gte=200&page=1&release_date.gte=2000&with_genres='
      +genreId;
    console.log('using URL: '+query);
    fetch(query)
    .then( response => response.json() )
    .then( json => {
      console.log(json);
      let movies= json.results;
      self.setState({movies})
    });
  }

  render() {
    return (
      <div className="App">
        <h1>React TMDB Example</h1>
        <hr />
        <Genres genres={this.state.genres} clicked={this.handleGenreClicked} />
        <hr />
        <Movies movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
