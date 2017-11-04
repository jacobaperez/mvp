import React from 'react';

const Card = (props) => {
  return (
    <div id='card'>
      <img src={`${props.card}`} alt='You need a deck' width="224" height="312"/>
    </div>
  )
}

export default Card
