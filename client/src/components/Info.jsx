import React from 'react'

class Info extends React.Component {
  render () {
    return (
      <div>
        <h2>Basic introduction to counting cards:</h2>
        <span>Premise: Assign specific cards values, and based on those values
          predict future outcomes</span>
        <h2>Guidelines:</h2>
          <p>Cards (2-6) will be given the value of 1.</p>
          <p>Cards (7-9) will be given value of 0.</p>
          <p>Cards (10-Ace) will be given a value of -1</p>
      </div>
    )
  }
}


export default Info;
