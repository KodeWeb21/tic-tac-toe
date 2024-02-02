import "../styles/Board.css";
import Circle from "./Circle";
import Cross from "./Cross";
import { useEffect, useState } from "react";

export default function Board({
  boards,
  updateBoard,
  incrementMoves,
  moves,
  updateWinners,
  win,
  lines,
  lineVictory,
  updateLineVictory
}) {
 
  const calculateVictory = (b) => {
    // Horizontal
    if (
      b[0][0] === b[0][1] &&
      b[0][1] === b[0][2] &&
      b[0][0] !== "" &&
      b[0][1] !== "" &&
      b[0][2] !== ""
    ){
      updateLineVictory(0, 1, 2);
      return b[0][0];
    }
      
    if (
      b[1][0] === b[1][1] &&
      b[1][1] === b[1][2] &&
      b[1][0] !== "" &&
      b[1][1] !== "" &&
      b[1][2] !== ""
    ){
       updateLineVictory(3, 4, 5);
      return b[1][0];
    }
      
    if (b[2][0] === b[2][1] && b[2][1] === b[2][2]  &&
       b[2][0] !== "" &&
       b[2][1] !== "" &&
       b[2][2] !== ""){
       updateLineVictory(6,7, 8);
      return b[2][0]
    };

    // Vertical
    if (
      b[0][0] === b[1][0] &&
      b[1][0] === b[2][0] &&
      b[0][0] !== "" &&
      b[1][0] !== "" &&
      b[2][0] !== ""
    ){
       updateLineVictory(0, 3, 6);
       return b[0][0];
    }
     

    if (
      b[0][1] === b[1][1] &&
      b[1][1] === b[2][1] &&
      b[0][1] !== "" &&
      b[1][1] !== "" &&
      b[2][1] !== ""
    ){
       updateLineVictory(1, 4, 7);
      return b[0][1];
    }
    

    if (
      b[0][2] === b[1][2] &&
      b[1][2] === b[2][2] &&
      b[0][2] !== "" &&
      b[1][2] !== "" &&
      b[2][2] !== ""
    ){
       updateLineVictory(2, 5, 8);
       return b[0][2];
    }
     

    //diagonal
    if (b[0][0] === b[1][1] && b[1][1] === b[2][2] &&
        b[0][0] !== "" &&
        b[1][1] !== "" &&
        b[2][2] !== ""){
       updateLineVictory(0, 4, 8);
      return b[0][0];
    }
    if (b[0][2] === b[1][1] && b[1][1] === b[2][0] &&
        b[0][2] !== "" &&
        b[1][1] !== "" &&
        b[2][0] !== ""){
       updateLineVictory(2, 4, 6);
      return b[0][2];
    }
  };

  const handleClick = (e) => {
    const element = e.target;
    if (element.matches(".board__row")) {
      if (element.childElementCount >= 1) return;
      if (win) return;
      incrementMoves();
      const column = element.getAttribute("data-column");
      const row = element.getAttribute("data-row");
      updateBoard({
        column,
        row,
      });
    }
  };

  useEffect(() => {
    if (moves >= 4) {
      const victory = calculateVictory(boards);
      if (victory) {
        if(win) setLineVictory([]);
        updateWinners(victory);
      }
    }
  }, [moves]);

  return (
    <div className="board" onClick={handleClick}>
      {boards.map((board, columIndex) =>
        board.map((row, rowIndex) => {
          return (
            <div
              key={rowIndex}
              data-column={columIndex}
              data-row={rowIndex}
              data-count={lines++}
              className={win && (lines===lineVictory[0] || lines === lineVictory[1] || lines === lineVictory[2]) ? "board__row board__row--win" : "board__row"}
            >
              {row === "x" && <Cross />}
              {row === "o" && <Circle size={50} />}
            </div>
          );
        }),
      )}
    </div>
  );
}