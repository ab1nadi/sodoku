import {empty_board} from '../../../../lib/sudoku'
import React, { useState, useEffect, useRef } from "react";
import Board from "./comps/board";


export default function SudokuBoard(props)
{
    // empty cells in the board
    // are marked with a 0
    let [puzzle, setPuzzle] = useState(JSON.parse(JSON.stringify(props.puzzle)));           // the current puzzle state
    let [puzzleStart] = useState(JSON.parse(JSON.stringify(props.puzzleStart)));            // the starting puzzle state
    let [errorsFound, setErrorsFound] = useState(JSON.parse(JSON.stringify(empty_board)));  // errors found during check validity
    let [insertionSet] = useState(new Set(props.insertionSet));                             // keeps track of how much was inserted
    let [highlighted, setHighlighted] =useState(null);                                      // the current highlighted square
    let [noteMode, setNotMode] = useState(false);                                           // sets note mode
    let [yesNo, setYesNo] = useState(false);                                                // displays the yes no prompt

    let boardRef =  useRef(0);

    useEffect(()=>
    {
        window.solution = props.solution;
        window.solutionFound = props.solutionFound;
        props.puzzle.forEach((r,y)=>r.forEach((c,x)=> {if(props.puzzle[y][x] !=0) insertionSet.add(`${x}${y}`)}));
    })


    // Removes errors
    var clearErrors = () =>
    {
        setErrorsFound(JSON.parse(JSON.stringify(empty_board)));
    }

    // Checks if the 
    // puzzle is correct up to 
    // this point and highlights the problems
    var checkValidity = () =>
    {
        let errorsFoundCopy = [... errorsFound];


        props.solution.forEach((r,y)=>r.forEach((e,x)=>
        {
            if(puzzle[y][x] != 0 && puzzle[y][x] != e)
                errorsFoundCopy[y][x] = 1;
        }));

        setErrorsFound(errorsFoundCopy);
    }

    // checks if the puzzle is solved
    // when it is full
    var checkSolved = () =>
    {
        for(let y = 0; y<puzzle[0].length; y++)
            for(let x = 0; x<puzzle[0].length; x++)
                if(props.solution[x][y] != puzzle[x][y])
                        return;
                    
        // call the solutionFound prop
        props.solutionFound();
        
    }

    // updates the value of 
    // the highlighted square
    var updateHighlighted = (v) =>
    {


        // if nothing is highlighted or this isn't an editable space
        if(highlighted == null || puzzleStart[highlighted.y][highlighted.x])
            return;

        let newPuzzle = [... puzzle];


        if(noteMode)
        {
            if(!Array.isArray(puzzle[highlighted.y][highlighted.x]))
                puzzle[highlighted.y][highlighted.x] = [];

            let index = newPuzzle[highlighted.y][highlighted.x].indexOf(v);

            if(index == -1)
            {
                newPuzzle[highlighted.y][highlighted.x].push(v);
                newPuzzle[highlighted.y][highlighted.x] = newPuzzle[highlighted.y][highlighted.x].sort();
            }
            else
            {
                newPuzzle[highlighted.y][highlighted.x].splice(index, 1);
            }


            insertionSet.delete(`${highlighted.x}${highlighted.y}`);

        }
        else
        {
            newPuzzle[highlighted.y][highlighted.x] = v;
            insertionSet.add(`${highlighted.x}${highlighted.y}`);

            if(insertionSet.size==81)
            checkSolved();
        }


        setPuzzle(newPuzzle);

        // save this incarnation of the bored
        props.save(newPuzzle, puzzleStart, props.solution, props.difficulty, insertionSet);
        

    }

    // moves the highlighted square
    // up down left right
    // using a key press
    var moveHighlight = (e) =>
    {
        clearErrors();
        
        if(highlighted == null)
        {
            setHighlighted({x:0, y:0});
            return;
        }

        const key = e.key;
        switch (key) {
            case "a":
            case "ArrowLeft":
                if(highlighted && highlighted.x>0)
                     setHighlighted({x:highlighted.x-1, y:highlighted.y});
                else
                     setHighlighted({x:8, y:highlighted.y});
                break;
            case "d":
            case "ArrowRight":
                if(highlighted && highlighted.x<8)
                     setHighlighted({x:highlighted.x+1, y:highlighted.y});
                else
                     setHighlighted({x:0, y:highlighted.y});
                break;
            case "w":
            case "ArrowUp":
                if(highlighted && highlighted.y>0)
                     setHighlighted({x:highlighted.x, y:highlighted.y-1});
                else
                     setHighlighted({x:highlighted.x, y: 8});
                break;
            case "s":
            case "ArrowDown":
                if(highlighted && highlighted.y<8)
                 setHighlighted({x:highlighted.x, y:highlighted.y+1});
            else
                 setHighlighted({x:highlighted.x, y: 0});
                break;

            default:
                return true;
        }

        return false;
    }

    // updates the highlighted
    // square on number press
    var numberPress = (e)  =>
    {
        const key = e.key;
        const re = new RegExp("[0-9]")

        if(re.test(key))
        {
            updateHighlighted(parseInt(key));
            return false;
        }
        return true;
    }

    // handles the shortcutt button
    // presses
    var shortCutts = (e) =>
    {
        const key = e.key;

        if(key == 'n')
        {
            setNotMode(!noteMode);
            return false;
        }
        else if(key == 'c')
        {
            updateHighlighted(0);
            return false;
        }


        return true;
    }

    // does all the keypress
    // handling
    var keyPress =  (e) =>
    {
        moveHighlight(e) && shortCutts(e) && numberPress(e);
    };



    return(

        <div id="sudoku"  className=" w-full flex flex-col">
            <div className="fixed w-screen h-screen top-0 left-0" onClick={()=>setHighlighted(null)}>

            </div>
            {/* the sudoku board */}
            <Board errors={errorsFound} onKeyDown={(e) => keyPress(e)} innerRef={boardRef} matrix={puzzle} highlighted={highlighted} setCellHighlight={(x,y)=> {clearErrors(); setHighlighted(x,y);}} puzzleStart={puzzleStart}/>
            
            {/* displays the yes no prompt */}
            {yesNo ? <YesNoPrompt close={()=>{setYesNo(false); boardRef.current.focus()}} yes={()=>{checkValidity(); boardRef.current.focus()}}/> : ""}


            {/* the edit and validity buttons */}
            <div className=" relative flex justify-between w-full gap-3 mt-2 ">
                <div className="flex flex-col gap-2 w-fit">
                    <div>Difficulty: {props.difficulty}</div>
                    <div className=" flex gap-1 items-center flex-wrap">
                        <button className={"w-10 h-10 border-black border-2  flex justify-center items-center rounded-sm hover:bg-slate-300 " + (noteMode ? "bg-slate-300" : "  bg-white ")}  onClick={()=>{setNotMode(!noteMode); boardRef.current.focus()}}>&#9998;</button>
                        <button onClick={()=>setYesNo(true)} className="hover:bg-slate-300 bg-white p-2 w-10 h-10 rounded-sm border-black border-2 flex justify-center items-center">&#x2713;</button>
                    </div>
                </div>


                {/* the number buttons */}
                <div className=" relative w-80 flex flex-wrap h-fit gap-2 ">
                    <div onClick={()=>{updateHighlighted(1)}} className="hover:bg-slate-300 rounded-full w-10 h-10 flex justify-center items-center border-2 border-black bg-white">1</div>
                    <div onClick={()=>{updateHighlighted(2); boardRef.current.focus();}} className="hover:bg-slate-300 rounded-full w-10 h-10 flex justify-center items-center border-2 border-black bg-white">2</div>
                    <div onClick={()=>{updateHighlighted(3); boardRef.current.focus();}} className="hover:bg-slate-300 rounded-full w-10 h-10 flex justify-center items-center border-2 border-black bg-white">3</div>
                    <div onClick={()=>{updateHighlighted(4); boardRef.current.focus();}} className="hover:bg-slate-300 rounded-full w-10 h-10 flex justify-center items-center border-2 border-black bg-white">4</div>
                    <div onClick={()=>{updateHighlighted(5); boardRef.current.focus();}} className="hover:bg-slate-300 rounded-full w-10 h-10 flex justify-center items-center border-2 border-black bg-white">5</div>
                    <div onClick={()=>{updateHighlighted(6); boardRef.current.focus();}} className="hover:bg-slate-300 rounded-full w-10 h-10 flex justify-center items-center border-2 border-black bg-white">6</div>
                    <div onClick={()=>{updateHighlighted(7); boardRef.current.focus();}} className="hover:bg-slate-300 rounded-full w-10 h-10 flex justify-center items-center border-2 border-black bg-white">7</div>
                    <div onClick={()=>{updateHighlighted(8); boardRef.current.focus();}} className="hover:bg-slate-300 rounded-full w-10 h-10 flex justify-center items-center border-2 border-black bg-white">8</div>
                    <div onClick={()=>{updateHighlighted(9); boardRef.current.focus();}} className="hover:bg-slate-300 rounded-full w-10 h-10 flex justify-center items-center border-2 border-black bg-white">9</div>
                    <div onClick={()=>{updateHighlighted(0); boardRef.current.focus();}} className="hover:bg-slate-300 rounded-full w-10 h-10 flex justify-center items-center border-2 border-black bg-white">X</div>
                </div>
            
            </div>

        </div>
    );
}




function YesNoPrompt(props)
{
    return (
            <div className="fixed top-0 left-0 flex w-screen flex-col gap-3 h-screen z-50 justify-center items-center bg-slate-900 bg-opacity-90">
                <div className=" z-35 text-7xl text-white">Are you sure?</div>
                <div className="flex gap-3">
                    <button onClick={()=> {props.yes(); props.close();}} className="hover:bg-slate-300 p-2  bg-white rounded-sm border-black border-2" >yes</button>
                    <button onClick={props.close} className="hover:bg-slate-300 p-2  bg-white rounded-sm border-black border-2" >no</button>
                </div>
        </div>
    )
}