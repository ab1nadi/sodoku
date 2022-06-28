

// TODO: Remove the effing cookies cuz they don't work

import {puzzleGenerator} from './sodoku'

var noteActive = false;
var activeCell = null;
var solution = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
var currentBoard = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
var currentBoardNotes = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

// upon starting look in cookies and see if a game already exists
if(read_cookie('gameSave') != null)
{
  var state = read_cookie("gameSave");
  solution = state.solution;
  currentBoard = state.currentBoard;
  currentBoardNotes = state.currentBoardNotes;
}



// the note button listener
document.getElementById("note").addEventListener("click", (evt) =>
{
var note = document.getElementById("note");
note.classList.toggle("active");
noteActive = !noteActive;

evt.stopPropagation();
});

// the td listener
document.querySelector('table').addEventListener("click", (evt) =>
{

    // if there was already an active cell
    if(activeCell != null)
    activeCell.classList.toggle("tdActive");

    // if we've clicked on an item that is already active
    if(activeCell == evt.target)
    {
        activeCell = null;
    }
    else 
    {
    // get the current cell and set it to active
    var tdE = evt.target;
    tdE.classList.toggle("tdActive");

    // set the active sell to the last clicked;
    activeCell = tdE;
    }
  



evt.stopPropagation();

});


// removes actveness from the active cell
window.addEventListener("click", (evt) =>
{

        if(activeCell != null)
        {
          activeCell.classList.toggle("tdActive");
          activeCell = null;
        }
})

window.addEventListener("keypress", (evt) =>
{
var key = evt.key; 

if(isFinite(key) && key != "0")
handleNumberkey(key);

// if they press the i key lets toggle edit mode
else if(key == 'e')
{
    var note = document.getElementById("note");
    note.classList.toggle("active");
    noteActive = !noteActive;
}

// arrow keys
/*
left = 37
up = 38
right = 39
down = 40
*/

else if(key == 'a')
{
    arrows("left");
}
else if(key == 'w')
{
    arrows("up");
}
else if(key == 'd')
{
    arrows("right");
}
else if(key == 's')
{
    arrows("down");
}


// for back space key
else if(key == 'q')
  {
    // if there is an active element
    if(activeCell && !activeCell.classList.contains("nonChangeable"))
    {
      activeCell.innerHTML = "";

      // get the row and column
      var r = activeCell.parentElement.dataset.row -1;
      var c = activeCell.dataset.col -1;

      currentBoard[r][c] = 0;
      currentBoardNotes[r][c] = 0;
    }
  }

})


document.getElementById("loadGame").addEventListener("click", (evt) =>
{
var e = document.getElementById("level");
var level = e.value;
  loadSudoku(level);
})


// returns a row column cell
function getCell(row, column)
{
  var string = '[data-row="' + row + '"] [data-col="'+ column +'"]';
let item = document.querySelector('[data-row="' + row + '"]  [data-col="'+ column +'"]')

return item;
}


// handles what we do with the number
// and the cell
function handleNumberkey(num)
{
var active = document.getElementsByClassName("tdActive")[0];
// make sure there is an active element
if(active && !active.classList.contains("nonChangeable"))
{
    if(noteActive)
    {
        if(!active.classList.contains("noteList"))
        {
          active.classList.add("noteList");
          active.innerHTML = "";
        }

        // break the inner text into pieces
        if(active.innerHTML == "")
            active.innerHTML = num;
        else if(active.innerHTML.search(num) == -1)
            {
            // add the element to the string
            // then pull them out and sort them
            var string = active.innerHTML + ", " + num;
            var elements = string.split(", ");
            elements.sort();
            
            // add them back to the active lements
            active.innerHTML = "";
            elements.forEach((el, index) =>
            {
                if(index == 0)
                active.innerHTML += el;
                else
                active.innerHTML += ", " + el;
            } )

            let row = active.parentElement.dataset.row;
            let col = active.dataset.col;
            currentBoard[parseInt(row)-1][parseInt(col)-1]=0;
            currentBoardNotes[parseInt(row)-1][parseInt(col)-1] = active.innerText;

            } 
        else 
        {
            var string = active.innerHTML
            // remove that one from the string
            var elements = string.split(", ");
            elements.sort();

            var index = elements.indexOf(num);

            elements.splice(index, 1);

            active.innerHTML = "";
            elements.forEach((el, index) =>
            {
                if(index == 0)
                active.innerHTML += el;
                else
                active.innerHTML += ", " + el;
            }

            )
            // reset that spot in the currentBoardNotes
            let row = active.parentElement.dataset.row;
            let col = active.dataset.col;
            currentBoardNotes[parseInt(row)-1][parseInt(col)-1] = active.innerText;
        }
    }
    else 
    {
        if(active.classList.contains('noteList'))
            active.classList.toggle("noteList");
        active.innerHTML = num

        let row = active.parentElement.dataset.row;
        let col = active.dataset.col;
        // add that little shit to the gameboard
        // and also check if it is 
        currentBoard[parseInt(row)-1][parseInt(col)-1]=parseInt(num);
        currentBoardNotes[parseInt(row)-1][parseInt(col)-1] = 0;
        // check if they solved it
        checkifSolved();
    }

    // something changed so lets save game state
    saveGameState();
}
}


// loads the puzzle 
// into the sudoku game
function loadSudoku(level)
{

  var z = new puzzleGenerator();
  var puzzle;


  // set the solution 
  solution = JSON.parse(JSON.stringify(z.solution));


  if(level == "easy")
    puzzle = z.easy();
  else if(level == "medium")
    puzzle = z.medium();
  else if(level == "difficult")
    puzzle = z.difficult();
  else if(level == "evil")
      puzzle = z.evil();

// set the board
currentBoard = JSON.parse(JSON.stringify(solution));
  for(var r = 1; r<10; r++)
    for(var c = 1; c<10; c++)
        {
            var element = getCell(r,c)

            if(puzzle[r-1][c-1] != 0)
            {
                element.innerText = puzzle[r-1][c-1];
                element.classList.add("nonChangeable")
                element.classList.remove("noteList");

            }
            else 
            {
                element.innerText = "";
                element.classList.remove("nonChangeable")
                element.classList.remove("noteList");
            }
        }   

    // save the game state
    saveGameState();
}

// checks if they won
function checkifSolved()
{
for(var r = 0; r < 9; r++)
    for(var c = 0; c<9; c++)
    if(solution[r][c] != currentBoard[r][c])
        return;

  
alert("CONGRATS YOU DID IT")
}


// handles arrow keys
function arrows(dir)
{
if(activeCell != null)
{
  let r = parseInt(activeCell.parentElement.dataset.row);
  let c = parseInt(activeCell.dataset.col);

  
  if(dir == "up")
  {
      // if we aren't on the top element
      // set the one above to active
      if(r != 1)
      {
        activeCell.classList.remove("tdActive")
        activeCell = getCell(r-1,c);
        activeCell.classList.add("tdActive");
      }
      else 
      {
        activeCell.classList.remove("tdActive")
        activeCell = getCell(9,c);
        activeCell.classList.add("tdActive");
      }

  }
  else if(dir == "down")
  {
    if(r != 9)
      {
        activeCell.classList.remove("tdActive")
        activeCell = getCell(r+1,c);
        activeCell.classList.add("tdActive");
      }
      else 
      {
        activeCell.classList.remove("tdActive")
        activeCell = getCell(1,c);
        activeCell.classList.add("tdActive");
      }
  }

  else if(dir == "left")
  {
    if(c != 1)
      {
        activeCell.classList.remove("tdActive")
        activeCell = getCell(r,c-1);
        activeCell.classList.add("tdActive");
      }
      else 
      {
        activeCell.classList.remove("tdActive")
        activeCell = getCell(r,9);
        activeCell.classList.add("tdActive");
      }
  }

  else if(dir == "right")
  {
    if(r != 9)
      {
        activeCell.classList.remove("tdActive")
        activeCell = getCell(r,c+1);
        activeCell.classList.add("tdActive");
      }
      else 
      {
        activeCell.classList.remove("tdActive")
        activeCell = getCell(r,1);
        activeCell.classList.add("tdActive");
      }
  }

}
else 
  {
      // set cell 1,1 to the active cell
      activeCell = getCell(1,1);

      activeCell.classList.add("tdActive");

  }
}




// save the gamestate to a cookie
function bake_cookie(name, value) {
    var cookie = name + "=" + JSON.stringify(value);
    document.cookie = cookie;

}


// read the cookie
function read_cookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}


// remove a cookie
function delete_cookie(name) {
    document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
}


// populates the sudoku board
function populateBoard()
{
    for(var r = 1; r<10; r++)
    for(var c = 1; c<10; c++)
        {
            var element = getCell(r,c)

            if(currentBoard[r-1][c-1] != 0)
            {
                element.innerText = currentBoard[r-1][c-1];
                element.classList.add("nonChangeable")
                element.classList.remove("noteList");

            }
            else if(currentBoardNotes[r-1][c-1] != 0)
            {
                element.innerText = currentBoardNotes[r-1][c-1];
                element.classList.add("noteList");
            }
            else 
            {
                element.innerText = "";
                element.classList.remove("nonChangeable")
                element.classList.remove("noteList");
            }

            
        }     
}


// saves the gamestate 
// to a cookie
function saveGameState()
{
    var object = {solution: JSON.parse(JSON.stringify(solution)), currentBoard: JSON.parse(JSON.stringify(currentBoard)), currentBoardNotes: JSON.parse(JSON.stringify(currentBoardNotes))}
    bake_cookie("gameSave", object);
}