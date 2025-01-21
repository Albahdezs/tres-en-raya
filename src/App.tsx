import React from "react";
import { JSX, ReactNode, JSXElementConstructor, ReactElement, useState } from "react";

type SquareProps = {
  value: string | null; // El valor puede ser una string ("X" o "O") o null
  onSquareClick: () => void; // Función sin argumentos que no retorna valor
};

function Square({ value, onSquareClick }: SquareProps) {
  const className = value === "X" ? "square x": value === "O" ? "square o": "square";
  return (
      <button className={className} onClick={onSquareClick}>
        {value}
      </button>
    );
}

type BoardProps = {
  xIsNext: boolean;
  squares: (string | null)[]; // Array que contiene "X", "O", o null
  onPlay: (nextSquares: (string | null)[]) => void; // Función que actualiza el estado de las casillas
};

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status: string | number | boolean | Iterable<ReactNode> | JSX.Element | null | undefined;
  if (winner) {
    status = (
      <>
        Ganador:&nbsp;<span className={winner === "X" ? "x" : "o"}>{winner}</span>
      </>
    );
  } else {
    status = (
      <>
        Siguiente jugador:&nbsp;
        <span className={xIsNext ? "x" : "o"}>{xIsNext ? "X" : "O"}</span>
      </>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any // El valor puede ser una string ("X" o "O") o null
    >> | Iterable<ReactNode> | null | undefined;
    if (move > 0) {
      description = 'Movimiento nº ' + move;
    } else {
      description = 'Empezar juego';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: any[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

