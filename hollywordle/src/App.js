import './App.css';
import { boardDefault, generateWordSet } from './Words';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext, useState, useEffect } from 'react';
import Gameover from './components/Gameover';
export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState('')
  const [gameOver, setGameOver] = useState({gameOver: false, guessWord: false,})

  useEffect (() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord)
      console.group(words)
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos-1] = '';
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }

  const onEnter = () => {
    if(currAttempt.letterPos ===6 ) return;
    let currWord = '';
    for (let i = 0; i < 6; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});
    } else {
      alert('word not found')
    }
    if (currWord === correctWord) {
      setGameOver({gameOver: true, guessWord: true})
      return;
    }
    if (currAttempt === 6) {
      setGameOver({gameOver: true, guessWord: true});
      return;
    }
  }
  return (
    <div className="App">
      <nav>
        <h1>HollyWordle!!</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard,currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, disabledLetters, setDisabledLetters, gameOver, setGameOver}}>
      <div className='game'>
        <Board />
        {gameOver.gameOver ? <Gameover /> : <Keyboard />}
      </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
