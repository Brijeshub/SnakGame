import React,{useState} from 'react'
import GamePiece from './GamePiece'

function GameState() {
const[score, setScore]=useState(0)
const[highScore,setHighScore]=useState(parseInt(localStorage.getItem('highScore'))||0)
const[gameOver,setGameOver]=useState(false)
const[collision,setCollision]=useState("")


  return (
   <>
   <p>Score:{score}</p>
   <p>High Score:{highScore}</p>
   {
    gameOver&&(
        <div>
            <p>Game Over:{collision==="wall"?"you hit the wall":"you hit the self"}</p>
            <p>please enter the press key and reset the game</p>
            </div>
    )
   }{
    !gameOver&&(
        <GamePiece/>

    )
   }
   
   </>
  )
}

export default GameState