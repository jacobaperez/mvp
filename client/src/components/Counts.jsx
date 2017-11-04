import React from 'react'

const Counts = ({counts}) => {
  return (
    <div>
      <h2 id="runningcount">Running Count:</h2>
        <h3 className="runningcount">{counts.runningCount}</h3>
      <h2 id="truecount">True count:</h2>
        <p className="truecount">{counts.trueCount.toFixed(2)}</p>
    </div>
  )
}

export default Counts
