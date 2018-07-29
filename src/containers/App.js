import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

import Movie from './components/Movies';
import Genre from './components/Genres';

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
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=66af19a8f162bdc60f7b70dc730c2e33')
      .then( response => response.json() )
      .then( json => {
        self.setState({genres: json.genres});
      } );
  }

  handleGenreClicked = (queryByGenre) => {
    let url='https://api.themoviedb.org/3/search/movie?api_key=66af19a8f162bdc60f7b70dc730c2e33'
    let query = '&query='+queryByGenre+'&page=1';
    let self = this;
    console.log('using URL: '+url+query);
    fetch(url+query)
    .then( response => response.json() )
    .then( json => {
      console.log(json);
      let movies= json.results;
      self.setState({movies})
    });
  }

  render() {

    const buttonStyle = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;
    let genresList = null;
    let moviesList = null;

    if (this.state.genres && this.state.genres.length>0) {
      genresList = (
        <div>
          {
            this.state.genres.map(g => {
              return (
                <Genre 
                  key={g.id} 
                  name={g.name} 
                  clicked={()=>this.handleGenreClicked(g.name)}
                />)
            })
          }
        </div>
      );
    }

    if (this.state.movies && this.state.movies.length>0) {
      moviesList = (
        <div>
          {
            this.state.movies.map(g => {
              return (
                <Movie 
                  key={g.id} 
                  title={g.original_title} 
                  description={g.overview}
                  src={g.poster_path}
              />)
            })
          }
        </div>
      );
    }

    if (this.state.showPersons) {
      buttonStyle.backgroundColor='red';
      persons = (
        <div>
          {
            this.state.persons.map((p,index)=>{
              return <Person 
                key={p.id} 
                name={p.name} 
                age={p.age} 
                click={()=>this.deletePersonHandler(index)}
                changed={(event)=>this.nameChangedHandler(event,p.id)}
                />
            })
          }
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button style={buttonStyle}
          onClick={ () => this.togglePersonsHandler() }>Toggle Persons</button>

        <br />

        {persons}
        <hr />
        {genresList}
        <hr />
        {moviesList}

      </div>
    );
    // return React.createElement('div',{className:'App'},React.createElement('h1',null,'Does this work now?'));
  }
}

export default App;
