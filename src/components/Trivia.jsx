import { useEffect, useState } from 'react'
import './trivia.css'

export default function Trivia({
  questions,
  setStop,
  questionNo,
  setQuestionNo,
}) {
  const [question, setQuestion] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [className, setClassName] = useState('answer')

  useEffect(() => {
    setQuestion(questions[questionNo - 1])
  }, [questions, questionNo])

  const delay = (duration, cb) => {
    setTimeout(() => {
      cb()
    }, duration)
  }

  const handleClick = (answer) => {
    setSelectedAnswer(answer)
    setClassName('answer active')
    delay(2000, () =>
      setClassName(answer.correct ? 'answer correct' : 'answer wrong'),
    )
    delay(6000, () => {
      if (answer.correct) {
        setQuestionNo((prev) => prev + 1)
        setSelectedAnswer(null)
      } else {
        setStop(true)
      }
    })
  }

  return (
    <div className='trivia'>
      <div className='question'>{question?.question}</div>
      <div className='answers'>
        {question?.answers.map((answer, id) => (
          <div
            key={id}
            className={selectedAnswer === answer ? className : 'answer'}
            onClick={() => handleClick(answer)}>
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  )
}
