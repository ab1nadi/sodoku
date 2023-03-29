export const save = (puzzle, puzzleStart, solution, difficulty) =>
{
    localStorage.setItem("puzzle", JSON.stringify(puzzle));
    localStorage.setItem("puzzleStart", JSON.stringify(puzzleStart));
    localStorage.setItem("solution", JSON.stringify(solution));
    localStorage.setItem("difficulty", difficulty);

}

export const  clear = () =>
{
    localStorage.clear("puzzle");
    localStorage.clear("puzzleStart");
    localStorage.clear("solution");
    localStorage.clear("difficulty");

}

export const load = () =>
{   
    let puzzle = localStorage.getItem("puzzle");
    let puzzleStart = localStorage.getItem("puzzleStart");
    let solution = localStorage.getItem("solution");
    let difficulty = localStorage.getItem("difficulty")
    if(!puzzle)
        return null;

    return {
        puzzle: JSON.parse(puzzle),
        puzzleStart: JSON.parse(puzzleStart),
        solution: JSON.parse(solution),
        difficulty: difficulty
    }
}
