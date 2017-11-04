import React from 'react';
import ReactDOM from 'react-dom';
import CardsList from './components/CardsList.jsx';
import $ from 'jquery';
import Info from './components/Info.jsx';
import Counts from './components/Counts.jsx';
import Guess from './components/Guess.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: "http://bit.ly/2iueZl8",
      runningCount: 0,
      trueCount: 0,
      cardsLeft: 0,
    }
  }

  draw() {
    $.ajax({
      url: 'http://127.0.0.1:3000/draw',
      type: 'GET',
      success: (cardInfo) => {
        console.log("Successful Get Request");
        if (cardInfo === 'bad') {
          alert('You need a deck Yo!')
        } else {
          let trueResult = this.state.runningCount/cardInfo[2] || this.state.trueCount;
          this.setState({
            card: cardInfo[0],
            runningCount: this.state.runningCount + cardInfo[1],
            trueCount: trueResult
          })
        }
      },
      error: (err) => {
        console.log("Error in GET:", err);
      }
    })
  }

  newDeck() {
    console.log("new deck clicked");
    $.ajax({
      url: 'http://127.0.0.1:3000/newdeck',
      type: 'GET',
      success: (cardInfo) => {
        console.log("Successful Get Request");
        this.setState({
          card: cardInfo,
          runningCount: 0,
          trueCount: 0
        })
      },
      error: (err) => {
        console.log("Error in GET:", err);
      }
    })
  }

  makeGuess() {
    let input = $('input').val();
    console.log("this was guessed", input );
  }

  render () {
    return (
      <div>
        <Info />
        <CardsList card={this.state.card}/>
        <div>
          <input placeholder="What's the count?"/>
          <button onClick={this.makeGuess}> Make a guess! </button>
        </div>
        <div>
          <button type="button" onClick={this.draw.bind(this)}>Draw a card</button>
          <button type="button" onClick={this.newDeck.bind(this)}>Create a new deck!</button>
        </div>
        <Guess />
        <h1>Single deck blackjack</h1>
        <Counts counts={this.state}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
