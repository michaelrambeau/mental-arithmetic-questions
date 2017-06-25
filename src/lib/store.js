import {observable, action} from 'mobx'
import getRandomQuestion from './getRandomQuestion'

const store = observable({
  history: {
    challenges: []
  },
  status: 'initial',
  challenge: null
})

store.start = action(function () {
  store.status = 'started'
  store.loadQuestion()
})

store.loadQuestion = () => {
  const question = getRandomQuestion()
  store.challenge = observable({
    question,
    startDate: new Date()
  })
}

store.selectAnwser = action(function (i) {
  const challenge = store.challenge
  const question = challenge.question
  const duration = (new Date() - challenge.startDate) / 1000
  const isCorrect = question.options[i] === question.result
  const updatedChallenge = {...challenge, answer: i, isCorrect, duration}
  store.challenge = updatedChallenge
  console.info('Answer selected', i, isCorrect, duration)
  store.history.challenges.push(updatedChallenge)
  if (isCorrect) {
    setTimeout(() => store.goNext(), 1000)
  }
})

store.goNext = action(function () {
  store.loadQuestion()
})

window.store = store
export default store
