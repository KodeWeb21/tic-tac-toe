import "./App.css";
import Cardplayer from "./components/Cardplayer";
import Board from "./components/Board";
import { useState } from "react";
import Button from "./components/Button";
import Circle from "./components/Circle";
import Cross from "./components/Cross";
export default function App() {
  const [lineVictory, setLineVictory] = useState([]);
  let lines = -1;

  const updateLineVictory = (p1, p2, p3) => {
    const newLineVictory = [...lineVictory];
    newLineVictory.push(p1, p2, p3);
    setLineVictory(newLineVictory);
  };

  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState({
    x: 0,
    o: 0
  });
  const [winPlayer, setWinPlayer] = useState(null);
  const [win, setWin] = useState(false);
  const [moves, setMoves] = useState(0);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const incrementMoves = () =>{
    setMoves(moves + 1)
  }

  const updateWinners = (player) =>{
    const newWinners = {...winner};
    newWinners[player] = newWinners[player] + 1;
    setWinner(newWinners);
    setWin(true);
    setWinPlayer(player);
  }

  const restar = () =>{
    const newBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
    setBoard(newBoard);
    setMoves(0)
    setWin(false);
    setWinPlayer(null);
    setLineVictory([]);
  }
  
  const updateBoard = ({column, row}) =>{
    const newBoard = [...board];
    newBoard[column][row] = turn;
    setBoard(newBoard);
    setTurn(turn === "x" ? "o" : "x");
  }
  return (
    <div className="App">
      <Cardplayer victories={winner} />
      <main className="main">
        {!win &&  <h1 className="title">Turn:  
          {turn === "o" && <Circle size={30}/>}
          {turn === "x" && <Cross size={30}/>}
        </h1>}
        {win &&
        <h1 className="title">
          {winPlayer === "o" && <>Winner: <Circle size={30}/></>}
          {winPlayer === "x" && <>Winner: <Cross size={30}/></>}

        </h1>}
        <Board 
          boards={board} 
          updateBoard={updateBoard} 
          incrementMoves={incrementMoves}
          moves={moves}
          updateWinners={updateWinners}
          win={win}
          lines={lines}
          lineVictory={lineVictory}
          updateLineVictory={updateLineVictory}
        />
        <Button reset={restar}/>
      </main>
    </div>
  );
}
