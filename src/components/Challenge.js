import React from 'react'

const Challenge = ({ challenge, onSelectAnswer, onGoNext }) => (
  <div className="card">
    <div className="card-header">
      <p className="card-header-title">
        <Header isCorrect={challenge.isCorrect} duration={challenge.duration} isWrong={challenge.answer > -1 && !challenge.isCorrect} />
      </p>
    </div>
    <div className="card-content">
      <Question
        question={challenge.question}
        onSelectAnswer={onSelectAnswer}
        answer={challenge.answer}
        isCorrect={challenge.isCorrect}
      />
    </div>
    <footer className="card-footer">
      <a className="card-footer-item" onClick={onGoNext}>NEXT &raquo;</a>
    </footer>
  </div>
)

const Header = ({ isCorrect, isWrong, duration }) => {
  if (isWrong) {
    return <span>Wrong answer!</span>
  }
  if (isCorrect) {
    return <span>Good anwser! ({duration.toFixed(0)} s.)</span>
  }
  return <span>Question</span>
}

const Question = ({ question, onSelectAnswer, answer, isCorrect }) => {
  const handleClickAnswer = (i) => () => onSelectAnswer(i)
  return (
    <div>
      <div className="title is-3">
        <span>{question.operands[0]}</span>
        <span style={{ margin: '0 1rem' }}><Operator sign={question.operator} /></span>
        <span>{question.operands[1]}</span>
        <span style={{ margin: '0 1rem' }}>&#61;&nbsp;&#63;</span>
      </div>
        <ul className="menu-list">
          {question.options.map((option, i) => (
            <li key={`${option}-${i}`}>
              <a
                onClick={handleClickAnswer(i)}
                className={answer === i ? 'is-active' : ''}
                style={answer === i && !isCorrect ? { backgroundColor: '#ff3860' } : {} }
              >
                {option}
              </a>
            </li>
          ))}
        </ul>
      <div>
      </div>
    </div>
  )
}

const Operator = ({ sign }) => {
  switch(sign) {
    case '+':
      return <span>&#43;</span>
    case '*':
      return <span>&times;</span>
    case '-':
      return <span>&minus;</span>
  }
}

export default Challenge
