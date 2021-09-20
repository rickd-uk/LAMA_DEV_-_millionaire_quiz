import { useRef } from 'react'
import './start.css'

export default function Start({ setUsername }) {
  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value)
  }

  const inputRef = useRef()
  return (
    <div className='start'>
      <input
        placeholder='enter your name'
        className='startInput'
        ref={inputRef}
      />
      <button className='startButton' onClick={handleClick}>
        Start
      </button>
    </div>
  )
}
