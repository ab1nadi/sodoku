import { useState, useEffect } from "react";

import { load, save } from "../../../../lib/persistence";
import { gen_puzzle } from "../../../../lib/sodoku";
import { Oval } from "react-loader-spinner";


export default function StartPage(props)
{
    let [difficulty, setDifficulty] = useState('easy');
    let [oldSave, setOldSave] = useState(load());
    let [loading, setLoading] = useState(false);



    let createGame = ()=>
    {
        setLoading(true);
        gen_puzzle(difficulty).then(({puzzle, puzzleStart, solution}) => 
        {
            save(puzzle, puzzleStart, solution, difficulty, new Set());
            props.setPuzzle(puzzle, puzzleStart, solution, difficulty, new Set());
            setLoading(false);
        })

    }

    let resumeGame = ()=> 
    {
        let {puzzle, puzzleStart, solution, difficulty, insertionSet} = load();

        props.setPuzzle(puzzle, puzzleStart, solution, difficulty, insertionSet);
    }

    return(   
    <div className="p-3 border-2 border-black flex flex-col gap-3 bg-white">

        {/* displays the resume button and title if there is an old save */}
        {oldSave ? <div className="flex justify-center text-xl">Resume Game</div> : ""}
        {oldSave ? <button onClick={resumeGame} className="hover:bg-slate-300 p-2  rounded-sm border-black border-2" >Resume</button> : ""}

        {/* displays a loading screen */}
        {loading ? <div className="fixed  flex-col top-0 left-0 w-screen h-screen flex justify-center items-center  bg-slate-800 bg-opacity-50">
                                    <Oval
                            height={80}
                            width={80}
                            color="white"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="gray"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                            />

                            <div className=" text-xl text-white">Creating Puzzle</div>
                   </div>
                 : ""}

        <div className="flex justify-center text-xl">New Game</div>

        <div className="flex gap-2">
            
            {/* selects the difficulty */}
            <select onChange={(e)=>{setDifficulty(e.target.value);}} className="hover:bg-slate-300 p-2  rounded-sm border-black border-2">
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="difficult">difficult</option>
                <option value="evil">evil</option>
            </select>

            <button onClick={createGame} className="hover:bg-slate-300 p-2  rounded-sm border-black border-2">Create</button>
        </div>
    </div>
    )
}