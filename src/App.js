import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component {

  state = {
    persons: [
      { id: 1, name: 'Wiston', age:35 },
      { id: 2, name:'Diana', age:30 },
      { id: 3, name:'Isaac', age:0 }
    ],
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

      </div>
    );
    // return React.createElement('div',{className:'App'},React.createElement('h1',null,'Does this work now?'));
  }
}

export default App;
