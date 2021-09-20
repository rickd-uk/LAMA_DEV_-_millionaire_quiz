import { useEffect, useState } from 'react'
import './trivia.css'

import useSound from 'use-sound'

import play from '../assets/sounds/play.mp3'
import correct from '../assets/sounds/correct.mp3'
import wrong from '../assets/sounds/wrong.mp3'
import wait from '../assets/sounds/wait.mp3'

export default function Trivia({
  questions,
  setStop,
  questionNo,
  setQuestionNo,
}) {
  const [question, setQuestion] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [className, setClassName] = useState('answer')
  const [letsPlay] = useSound(play)
  const [correctAnswer] = useSound(correct)
  const [wrongAnswer] = useSound(wrong)

  useEffect(() => {
    letsPlay()
  }, [letsPlay])

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
    delay(5000, () => {
      if (answer.correct) {
        correctAnswer()
        delay(1000, () => {
          setQuestionNo((prev) => prev + 1)
          setSelectedAnswer(null)
        })
      } else {
        delay(1000, () => {
          wrongAnswer()
          setStop(true)
        })
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
