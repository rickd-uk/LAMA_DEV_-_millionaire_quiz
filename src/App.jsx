import { useEffect, useState } from 'react'
import './app.css'
import Timer from './components/Timer'
import Trivia from './components/Trivia'
import { questions, moneyPyramid } from './data'

function App() {
  const [questionNo, setQuestionNo] = useState(1)
  const [stop, setStop] = useState(false)
  const [earned, setEarned] = useState('$ 0')

  useEffect(() => {
    questionNo > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNo - 1).amount)
  }, [questionNo])

  return (
    <div className='app'>
      <div className='main'>
        {stop ? (
          <h1 className='endText'>You earned: {earned}</h1>
        ) : (
          <>
            <div className='top'>
              <div className='timer'>
                <Timer setStop={setStop} questionNo={questionNo} />
              </div>
            </div>
            <div className='bottom'>
              <Trivia
                questions={questions}
                setStop={setStop}
                setQuestionNo={setQuestionNo}
                questionNo={questionNo}
              />
            </div>
          </>
        )}
      </div>
      <div className='pyramid'>
        <ul className='moneyList'>
          {moneyPyramid.map((mp) => (
            <li
              key={mp.id}
              className={
                questionNo === mp.id ? 'moneyListItem active' : 'moneyListItem'
              }>
              <span className='moneyListItemNo'>{mp.id}</span>
              <span className='moneyListItemAmount'>{mp.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
