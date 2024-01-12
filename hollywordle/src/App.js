import './App.css';
import { boardDefault, generateWordSet } from './Words';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext, useState, useEffect } from 'react';
import GameOver from '/Users/joeycaltabellotta/HollyWordle/hollywordle/src/App.js';
import PopUp from './components/PopUp';
import NavBar from './components/NavBar';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState('')
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})
  const [showPopup, setShowPopup] = useState(true)
  const [popupVisible, setPopupVisible] = useState(true);
  
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
      if(currAttempt.letterPos !== 6 ) return;
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
        setGameOver({ gameOver: true, guessedWord: true });
        return;
      }
      if (currAttempt.attempt === 6) {
        setGameOver({ gameOver: true, guessedWord: false });
        return;
      }
    }
    const replayGame = () => {
      setBoard(boardDefault);
      setCurrAttempt({ attempt: 0, letterPos: 0 });
      setDisabledLetters([]);
      setGameOver(false);
    };
    
    const closePopup = () => {
      setShowPopup(false);
    };
    
    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
    return (
      <div className="App">
      <NavBar togglePopup={togglePopup} />
      {showPopup && (
        <div className="popup-overlay">
          <PopUp closePopup={closePopup} />
        </div>
      )}
      <AppContext.Provider value={{
        board, 
        setBoard,
        currAttempt, 
        setCurrAttempt, 
        onSelectLetter, 
        onDelete, 
        onEnter, 
        correctWord, 
        disabledLetters, 
        setDisabledLetters, 
        gameOver, 
        setGameOver, 
        replayGame, 
        togglePopup,
        closePopup
      }}>
      <div className='game'>
        <Board />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
