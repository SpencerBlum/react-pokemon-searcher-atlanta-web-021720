import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {


  state = {
    allPokemon: [],
    search: ""
  }

componentDidMount(){
  fetch("http://localhost:3000/pokemon")
  .then(resp => resp.json())
  .then(data => {
    this.setState({allPokemon: data})
  })
}

renderPokemon = () => {
  if (this.state.search === ""){
  return this.state.allPokemon
  } else {
   return this.state.allPokemon.filter(pokemon => {
    return  pokemon.name.includes(this.state.search)
    })
  }
}

renderSearch = (event) =>{
  this.setState({search: event.target.value})

}

handleSubmit = (event,formState) => {
event.preventDefault()
      let newobject = {
        "name": formState.name,
        "stats": [{},{},{},{},{},{"value": formState.hp, "name": "hp"}],
        "sprites": 
        {"front": formState.frontUrl,
        "back": formState.backUrl}
      }
  this.setState({allPokemon: [...this.state.allPokemon, newobject]})
  this.addPokemon(newobject)
event.target.reset()
}


addPokemon = (pokemon) => {

  fetch("http://localhost:3000/pokemon", {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pokemon),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleSubmit = {this.handleSubmit} />
        <br />
        <Search  renderSearch = {this.renderSearch} onChange={() => console.log('🤔')} />
        <br />
        <PokemonCollection  allPokemon = {this.renderPokemon()} />
      </Container>
    )
  }
}

export default PokemonPage
