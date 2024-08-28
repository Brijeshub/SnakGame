import React from 'react'
import { useState } from 'react'

function Score() {
    const[score,setScore]=useState(0)
    const scoreCount=()=>{
        setScore(score+1)
    }
  return (
    <div>
     <div score={scoreCount}>Score:{score}</div>
    </div>
  )
}

export default Score