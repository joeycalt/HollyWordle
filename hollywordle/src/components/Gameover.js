import React, {useContext, useEffect} from 'react'
import { AppContext } from '../App'

const Gameover = () => {
    const {gameOver, currAttempt, correctWord, replayGame} = useContext(AppContext)

    useEffect(() => {
        console.log('Gameover component rendered');
      }, []);
    return (
        <div className='gameOver'>
        <h3>{gameOver.guessedWord ? 'correct' : 'not correct'}</h3>
        <h1>Correct: {correctWord}</h1>
        {gameOver.guessedWord && (
        <h3> you guessed in {currAttempt.attempt} attempts</h3>)}
         <button onClick={replayGame}>Replay Game</button>
    </div>
  )
}

export default Gameover