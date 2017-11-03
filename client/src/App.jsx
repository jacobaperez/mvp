import React from 'react';
import ReactDOM from 'react-dom';
import CardsList from './components/CardsList.jsx';
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: null,
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
        // do a setState in here to change state and
        // cause a rerender.
      },
      error: (err) => {
        console.log("Error in GET:", err);
      }
    })

    // TODO: make ajax (to /draw) call here to my server
    // then my server calls the api and stores the count
    // returns the card image from api and count from db.
    // inside of ajax -> setState.
  }

  render () {
    return (
      <div>
        <CardsList card={this.state.card}/>
        <button type="button" onClick={this.draw.bind(this)}>Draw a card</button>
        <h2>Running count: {this.state.runningCount}</h2>
        <h2>True count: {this.state.trueCount}</h2>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
