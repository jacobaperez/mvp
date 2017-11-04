import React from 'react';
import Card from './Card.jsx';

const CardsList = (props) => {
  return (
    <div id="cardlist">
      <h2>Card Counter Trainer</h2>
      {
        // TODO: Leave in brackets to implement a multiple
        // card draw at a time
        <Card card={props.card}/>
      }
    </div>
  )
}

export default CardsList
