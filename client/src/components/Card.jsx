import React from 'react';

const Card = (props) => {
  return (
    <div>
      <img src={`${props.card}`} alt='Getting a new deck :)' width="224" height="312"/>
      {
      //  <img src={`${props.card}`} alt='card' width="224" height="312"/>
      }
    </div>
  )
}

export default Card
