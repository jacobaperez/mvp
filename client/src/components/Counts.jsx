import React from 'react'

const Counts = ({counts}) => {
  return (
    <div>
      <h2 id="runningcount">Running Count:
        <span className="runningcount">{counts.runningCount}</span>
      </h2>
      <h2 id="truecount">True count:
        <span className="truecount">{counts.trueCount.toFixed(2)}</span>
      </h2>
    </div>
  )
}

export default Counts
