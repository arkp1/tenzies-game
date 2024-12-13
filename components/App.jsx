import React from "react";
import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
;
export default function App() {
  const [dieNumbers, setDieNumbers] = useState(() => generateDieNumbers());

 const gameWon = dieNumbers.every(die => die.isHeld) && dieNumbers.every(die => die.value === dieNumbers[0].value)

  function generateDieNumbers() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if(!gameWon) {
    setDieNumbers(oldDie => 
      oldDie.map(die => 
        die.isHeld == true ? die : {...die, value: Math.ceil(Math.random() * 6)}
      )
    )
  }
  else {
    setDieNumbers(generateDieNumbers())
  }
  }

  function hold(id) {
    setDieNumbers((oldDie) =>
      oldDie.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const dieElement = dieNumbers.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <h2>TENZIES</h2>
      <p>Roll the dice until all numbers are same. Click on the number to lock it.</p>
      <div className="container">{dieElement}</div>
      <button
        className="roll-button"
        onClick={rollDice}
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
