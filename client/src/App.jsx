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
      currentStats: "0.00"
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
    let validInput = !isNaN(input);
    let realCount = this.state.runningCount;
    console.log("this was guessed", input, typeof Number(input) );
    console.log(Number(input) === realCount);
    let myguess = Number(input) === realCount;
    if (!validInput || input === '') {
      $('input').val('');
      alert("That ain't no number bruh!");
    } else {
      $.ajax({
        url: 'http://127.0.0.1:3000/guess',
        type: 'POST',
        data: { guess: myguess },
        success: (cardInfo) => {
          console.log("Successfully sent guess to server");
          console.log(cardInfo);
        },
        error: (err) => {
          console.log("Error in POST to guess in server:", err);
        }
      })
      $('input').val('');
    }
  }

  checkStats() {
    console.log("check stats was clicked");
    $.ajax({
      url: 'http://127.0.0.1:3000/getstats',
      type: 'GET',
      success: (stats) => {
        console.log("Successfully sent guess to server");
        console.log(stats);
        if (isNaN(stats)) {
          alert('You gotta play the game first bruh!')
        } else {
          this.setState({
            currentStats: stats
          })
        }
      },
      error: (err) => {
        console.log("Error in POST to guess in server:", err);
      }
    })

  }

  clearStats() {
    console.log('clear stats was clicked');
    $.ajax({
      url: 'http://127.0.0.1:3000/clearstats',
      type: 'GET',
      success: (data) => {
        console.log("Successfully sent guess to server");
        console.log(data);
        this.setState({
          currentStats: "0.00"
        })
      },
      error: (err) => {
        console.log("Error in POST to guess in server:", err);
      }
    })
  }


  render () {
    return (
      <div>
        <Info />
        <CardsList card={this.state.card}/>
        <h2>{`${this.state.currentStats}%`}</h2>
        <div>
          <input placeholder="What's the count?"/>
          <button onClick={this.makeGuess.bind(this)}> Make a guess! </button>
        </div>
        <div>
          <button type="button" onClick={this.checkStats.bind(this)}>Check your stats</button>
          <button type="button" onClick={this.clearStats.bind(this)}>Clear your stats</button>
        </div>
        <div>
          <button type="button" onClick={this.draw.bind(this)}>Draw a card</button>
          <button type="button" onClick={this.newDeck.bind(this)}>Create a new deck!</button>
        </div>
        <h1>
          Single deck blackjack
        </h1>
        <Counts counts={this.state}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
