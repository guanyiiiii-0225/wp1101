/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './css/Board.css'


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        {/* -- TODO 3-1 -- */}
        {/* Useful Hint: createBoard(...) */}
        let b = createBoard(boardSize, mineNum);
        setBoard(b.board);
        setRemainFlagNum(mineNum);
        setMineLocations(b.mineLocations)
        
    }

    const restartGame = () => {
        {/* -- TODO 5-2 -- */}
        {/* Useful Hint: freshBoard() */}
        
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        {/* -- TODO 3-2 -- */}
        {/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */}
        {/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */}
        {/* Reminder: The cell can be flagged only when it is not revealed. */}
        
    
        if(board[x][y].revealed === false){
            updateflagHelper(x, y);
        }
    };

    const updateflagHelper = (x, y) => {
        let newBoard = Array.from(board);
        newBoard[x][y].flagged? setRemainFlagNum(mineNum + 1): setRemainFlagNum(mineNum - 1)
        newBoard[x][y].flagged = !newBoard[x][y].flagged;
        setBoard(newBoard);
    }

    const revealCell = (x, y) => {
        {/* -- TODO 4-1 -- */}
        {/* Reveal the cell */}
        {/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */}
        {/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */}
        
        if(win === false && gameOver === false){
            let newBoard = Array.from(board);
            if(!newBoard[x][y].flagged && !newBoard[x][y].revealed){
                newBoard[x][y].revealed = true;
            }
            if(newBoard[x][y].value !== '💣'){
                setNonMineCount(nonMineCount+1);
            }
            else{
                setGameOver(true);
            }
            setBoard(newBoard);
        }
    };

    return(
        <div className = 'boardPage' >
            <div className = 'boardWrapper' >
            <h1>This is the board Page!</h1>  {/* This line of code is just for testing. Please delete it if you finish this function. */}
            
            {/* -- TODO 3-1 -- */}
            {/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
            {/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
            {gameOver || win? 
            <div className = "boardContainer">
            {board.map(row => (
                <div id ={`"row"${row[1].x}`} style = {{display: 'flex', opacity: 0.5}}>
                    {row.map(cell => (
                        <Cell rowIdx = {cell.x} colIdx = {cell.y} detail = {cell} updateFlag = {updateFlag} revealCell = {revealCell} ></Cell>
                    ))}
                </div>
            ))}
            <Modal win = {win}/>
            </div>
            :
            <div className = "boardContainer">
                {board.map(row => (
                    <div id ={`"row"${row[1].x}`} style = {{display: 'flex'}}>
                        {row.map(cell => (
                            <Cell rowIdx = {cell.x} colIdx = {cell.y} detail = {cell} updateFlag = {updateFlag} revealCell = {revealCell} ></Cell>
                        ))}
                    </div>
                ))}
            </div>}


            </div>
        </div>
    ); 

    

}

export default Board