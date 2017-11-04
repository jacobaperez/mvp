import React from 'react';
import ReactDOM from 'react-dom';
import CardsList from './components/CardsList.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: "http://bit.ly/2iueZl8",
      runningCount: 0,
      trueCount: 0,
    }
  }

  draw() {
    console.log('Draw was clicked!');
    $.ajax({
      url: 'http://127.0.0.1:3000/draw',
      type: 'GET',
      success: (cardInfo) => {
        console.log("Successful Get Request");
        if (cardInfo === 'bad') {
          console.log('need a new deck!');
        } else {
          this.setState({
            card: cardInfo[0],
            runningCount: this.state.runningCount + cardInfo[1],
            trueCount: this.state.trueCount + (this.state.runningCount/cardInfo[2])
          })
        }
      },
      error: (err) => {
        console.log("Error in GET:", err);
      }
    })
  }

  newDeck() {
    console.log("clicked");
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

  render () {
    return (
      <div>
        <CardsList card={this.state.card}/>
        <button type="button" onClick={this.draw.bind(this)}>Draw a card</button>
        <button type="button" onClick={this.newDeck.bind(this)}>Create a new deck!</button>
        <h1>Using 2 decks</h1>
        <h2 id="runningcount">Running Count:</h2>
          <h3 class="runningcount">{this.state.runningCount}</h3>
        <h2 id="truecount">True count:</h2>
          <p class="truecount">{this.state.trueCount}</p>
        <h2>Basic introduction to counting cards:</h2>
          <p>Premise: Assign specific cards values, and based on those values
          predict future outcomes</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
