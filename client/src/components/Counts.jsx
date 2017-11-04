import React from 'react'

const Counts = ({counts}) => {
  return (
    <div>
      <h2 id="runningcount">Running Count: </h2>
        <span className="runningcount">{counts.runningCount}</span>
      <h2 id="truecount">True count: </h2>
        <span className="truecount">{counts.trueCount.toFixed(2)}</span>
    </div>
  )
}

export default Counts
