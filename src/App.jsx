import React, { useEffect, useRef, useState } from 'react'
import './App.css'

const PxSize = 15
const Gamegrid = Array.from({ length: PxSize }, () => 
  new Array(PxSize).fill(""));
const initial_snak = [[6, 6]];

// console.log(Gamegrid)
const genreteFood = () => {
  const x = Math.floor(Math.random() * PxSize)
  const y = Math.floor(Math.random() * PxSize)
  return [x, y];
};

function App() {
  const [score,setScore]=useState(0)
  const [highScore,setHighScore]=useState(0)
  const [snakbody, setSnakbody] = useState(initial_snak)
  const directionRef = useRef([0, 0])
  const foodRef = useRef(genreteFood())
  // console.log(foodRef)
  


  const isSnakbodyDiv = (xy, yc) => {
    return snakbody.some(([x, y]) => {
      return x === xy && y === yc;
    });
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSnakbody((prevsnakbody) => {
        const newHeads = [
          prevsnakbody[0][0] + directionRef.current[0],
          prevsnakbody[0][1] + directionRef.current[1],  
     
        ];
        if (
          newHeads[0] < 0 ||
          newHeads[0] >= PxSize ||
          newHeads[1] < 0 ||
          newHeads[1] >= PxSize ||
          prevsnakbody.some(([x, y]) => {
            return newHeads[0] === x && newHeads[1] === y;
          })
        )
        {
          directionRef.current = [1, 0];
          if (score > highScore) setHighScore(score); // Update high score if the current score is higher
          setScore(0); // Reset score
          return initial_snak;
        }
        const copySnakbody = prevsnakbody.map((arr) => [...arr])
        if (
          newHeads[0] === foodRef.current[0] &&
          newHeads[1] === foodRef.current[1]
        ) {
          foodRef.current = genreteFood();
          setScore(score+1);
        } else {
          copySnakbody.pop();
        }
       
        copySnakbody.unshift(newHeads);
        return copySnakbody;
      });
    }, 300);
   
    
    const hendledirection = (e) => {
      const keys = e.key
      console.log(keys);
      if (keys === "ArrowUp" && directionRef.current[1] != 1) {
        directionRef.current = [0, -1]
      }
      else if (keys === "ArrowLeft" && directionRef.current[0] != 1) {
        directionRef.current = [-1, 0]
      }
      else if (keys === "ArrowRight" && directionRef.current[0] != -1) {
        directionRef.current = [1, 0]
      }
      else if (keys === "ArrowDown" && directionRef.current[1] != -1) {
        directionRef.current = [0, 1]
      }
    };


    window.addEventListener('keydown', hendledirection)
    // reset code............................................
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", hendledirection)
    }
  }, [score,highScore]);



  return (
    <>
      <div className='text-2xl font-semibold text-center mt-36'>Snake Game</div>
      <div className={`text-sm font-bold text-center mt-5 `}
      >
        <p className='m-3'>High Score:{highScore}</p>
        <p className='m-2'>Score:{score}</p>
        
        {/* <Score/> */}
      </div>

      {/* Container and cell defined.............................................. */}
      <div className='container'>
        {Gamegrid.map((row, yc) => {
          return row.map((cell, xc) => {
            return (
              <div
                className={`cell ${isSnakbodyDiv(xc, yc) ? 'snaks' : ""}
      ${foodRef.current[0] === xc && foodRef.current[1] === yc ? 'food' : ""}`}>
              </div>
            )
            
          });
        })
        }
    
      </div>
    
    </>
  )
}
export default App