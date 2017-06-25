import React from 'react'
import math from 'mathjs'

const History = ({ history }) => {
  const challenges = history.challenges
  const avg = math.mean(challenges.map(challenge => challenge.duration))
  const last = challenges.slice().reverse().slice(0, 10)
  const correct = math.sum(challenges.map(challenge => challenge.isCorrect ? 1 : 0))
  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <div className="card-header">
        <div className="card-header-title">
          History
        </div>
      </div>
      <div className="card-content">
        <div>Correct answers: {correct} / {challenges.length} questions</div>
        <div>Average response time: {avg.toFixed(1)} s.</div>
        <div>
        <span>Last 10 answers: </span>
        <ul>
          {last
            .map((challenge, i) => (
              <li key={i}>
                <span>{challenge.isCorrect ? 'Correct' : 'Wrong'}</span>
                <span> ({challenge.duration.toFixed(0)} s.)</span>
              </li>
            ))
          }
        </ul>
        </div>
      </div>
    </div>
  )
}

export default History
