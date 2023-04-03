import { useState } from "react";
import StartPage from "./sudoku_comp/start_page/start_page";
import Winner from "./sudoku_comp/winner/winner";
import SudokuBoard from "./sudoku_comp/board/sudoku_board";
import {save, clear } from "../../lib/persistence";
window.clearSol = clear;


export default function SudokuElement()
{   
    let [openPuzzle, setOpenPuzzle] = useState(false);
    let [puzzle, setPuzzle] = useState(null);
    let [puzzleStart, setPuzzleStart] = useState(null);
    let [solution, setSolution] = useState(null);
    let [difficulty, setDifficulty] = useState(null);
    let [insertionSet, setInsertionSet] = useState(null);
    let [won, setWon] = useState(false);

    // called by sudoku board
    // if it found a solution
    let foundSolution = ()=> 
    {
        setWon(true);
        clear();
    }

    return(
        <div className=" max-w-xl min-w-[200px] relative flex flex-col items-center pl-3 pr-3 gap-10 ">
                
            {openPuzzle ? <button onClick={()=>{setOpenPuzzle(false); setWon(false);}} className="absolute bg-white z-50 left-3 top-5 hover:bg-slate-300 p-2  rounded-sm border-black border-2 ">Back</button> : ""}
            
            <div className="flex  justify-center"> 
                <div className=" text-5xl text-white">Sudoku</div>
            </div>

            {won ? <Winner/> : ""}

            {/* opens the puzzle or the start page. The start page will always be opend first*/}
            {openPuzzle ? <SudokuBoard save={save} insertionSet={insertionSet} difficulty={difficulty} puzzleStart={puzzleStart} puzzle={puzzle} solution={solution} solutionFound={foundSolution}></SudokuBoard> 
                        :
                          <StartPage setPuzzle={(puzzle,puzzleStart,solution, difficulty, insertionSet)=>{setPuzzle(puzzle); setPuzzleStart(puzzleStart); setSolution(solution); setDifficulty(difficulty); setOpenPuzzle(true); setInsertionSet(insertionSet)}}/>}
        </div>
    )
}








//        <SudokuBoard save={save} puzzle={b} solution={s} solutionFound={()=>{alert("solution found, good job")}}></SudokuBoard>
