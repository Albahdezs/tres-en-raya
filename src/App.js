import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
function Square({ value, onSquareClick }) {
    const className = value === "X" ? "square x" : value === "O" ? "square o" : "square";
    return (_jsx("button", { className: className, onClick: onSquareClick, children: value }));
}
function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        }
        else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = (_jsxs(_Fragment, { children: ["Ganador:\u00A0", _jsx("span", { className: winner === "X" ? "x" : "o", children: winner })] }));
    }
    else {
        status = (_jsxs(_Fragment, { children: ["Siguiente jugador:\u00A0", _jsx("span", { className: xIsNext ? "x" : "o", children: xIsNext ? "X" : "O" })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "status", children: status }), _jsxs("div", { className: "board-row", children: [_jsx(Square, { value: squares[0], onSquareClick: () => handleClick(0) }), _jsx(Square, { value: squares[1], onSquareClick: () => handleClick(1) }), _jsx(Square, { value: squares[2], onSquareClick: () => handleClick(2) })] }), _jsxs("div", { className: "board-row", children: [_jsx(Square, { value: squares[3], onSquareClick: () => handleClick(3) }), _jsx(Square, { value: squares[4], onSquareClick: () => handleClick(4) }), _jsx(Square, { value: squares[5], onSquareClick: () => handleClick(5) })] }), _jsxs("div", { className: "board-row", children: [_jsx(Square, { value: squares[6], onSquareClick: () => handleClick(6) }), _jsx(Square, { value: squares[7], onSquareClick: () => handleClick(7) }), _jsx(Square, { value: squares[8], onSquareClick: () => handleClick(8) })] })] }));
}
export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }
    const moves = history.map((_, move) => {
        let description;
        if (move > 0) {
            description = 'Movimiento nº ' + move;
        }
        else {
            description = 'Empezar juego';
        }
        return (_jsx("li", { children: _jsx("button", { onClick: () => jumpTo(move), children: description }) }, move));
    });
    return (_jsxs("div", { className: "game", children: [_jsx("div", { className: "game-board", children: _jsx(Board, { xIsNext: xIsNext, squares: currentSquares, onPlay: handlePlay }) }), _jsx("div", { className: "game-info", children: _jsx("ol", { children: moves }) })] }));
}
function calculateWinner(squares) {
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
