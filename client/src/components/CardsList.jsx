import React from 'react';
import Card from './Card.jsx';

const CardsList = (props) => {
  return (
    <div id="cardlist">
      <h2>Card Counter Trainer</h2>
      {
        // TODO: accept a card/cards and render a Card comp.
        <Card card={props.card}/>
      }
    </div>
  )
}

export default CardsList
