export const save = (puzzle, puzzleStart, solution, difficulty, insertionSet) =>
{
    localStorage.setItem("puzzle", JSON.stringify(puzzle));
    localStorage.setItem("puzzleStart", JSON.stringify(puzzleStart));
    localStorage.setItem("solution", JSON.stringify(solution));
    localStorage.setItem("insertionSet", JSON.stringify(Array.from(insertionSet)));
    localStorage.setItem("difficulty", difficulty);

}

export const  clear = () =>
{
    localStorage.clear("puzzle");
    localStorage.clear("puzzleStart");
    localStorage.clear("solution");
    localStorage.clear("difficulty");
    localStorage.clear("insertionSet");

}

export const load = () =>
{   
    let puzzle = localStorage.getItem("puzzle");
    let puzzleStart = localStorage.getItem("puzzleStart");
    let solution = localStorage.getItem("solution");
    let difficulty = localStorage.getItem("difficulty");
    let insertionSet = localStorage.getItem("insertionSet");

    if(!puzzle)
        return null;

    return {
        puzzle: JSON.parse(puzzle),
        puzzleStart: JSON.parse(puzzleStart),
        solution: JSON.parse(solution),
        difficulty: difficulty,
        insertionSet: new Set(JSON.parse(insertionSet)),

    }
}
