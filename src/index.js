
      import {puzzleGenerator} from './sodoku'
            

      // data needed for the game
      var noteActive = false;
      var activeCell = null;
      var solution = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
      var currentBoard = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
      var currentBoardNotes = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

      // starting out things are empty 
      var empty = true;


      // make the solution viewable from the console
      window.solution = solution;
      
      // the validity button listner
      document.getElementById("validity").addEventListener("click", (evt) => checkValidity());

      // the note button listener
      document.getElementById("note").addEventListener("click", (evt) =>
      {
        var note = document.getElementById("note");
        note.classList.toggle("active");

        /// change the content of the button to reflect its mode
        if(!noteActive)
        note.innerHTML = "Note Mode (Active)";
        else 
        note.innerHTML = "Note Mode";


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

      // prevent arrow keys from scrolling cuz that is stupid
      window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);



    // for all those other key events
      window.addEventListener("keydown", (evt) =>
      {

        // we dont want to do anything if the puzzle hasn't been loaded
        if(empty)
        return;


        var key = evt.key; 

        var keyCode = evt.keyCode;


        if(isFinite(key) && key != "0")
        handleNumberkey(key);

        // if they press the i key lets toggle edit mode
        else if(key == 'e' || evt.shiftKey)
        {
            var note = document.getElementById("note");
            note.classList.toggle("active");

            if(!noteActive)
            note.innerHTML = "Note Mode (Active)";
            else 
            note.innerHTML = "Note Mode";

            noteActive = !noteActive;
        }

        // arrow keys
        /*
        left = 37
        up = 38
        right = 39
        down = 40
        */

        else if(key == 'a' || keyCode == 37)
        {
            arrows("left");
        }
        else if(key == 'w' ||keyCode == 38)
        {
            arrows("up");
        }
        else if(key == 'd' || keyCode == 39)
        {
            arrows("right");
        }
        else if(key == 's' || keyCode == 40)
        {
            arrows("down");
        }


        // for back space key
       else if(key == 'q' || evt.ctrlKey)
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
        empty = false;
          loadSoduku(level);
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
        }
      }


      function loadSoduku(level)
      {

        // grab the puzzle gen module
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
        currentBoard = JSON.parse(JSON.stringify(puzzle));



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
      }

      function checkifSolved()
      {
        for(var r = 0; r < 9; r++)
        { for(var c = 0; c<9; c++)
          
            {
              if(solution[r][c] != currentBoard[r][c])
                return;
            }
        }
        alert("CONGRATS YOU DID IT")
      }

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
            if(c != 9)
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

      window.checkValidity = checkValidity;
      // checkValidity 
      // checks if the current game board has any errors as apposed to the solution
      function checkValidity()
      {
        let cellList = [];

        
        for(var x = 1; x < 10; x++)
          for(var y = 1; y<10; y++)
          {
            // if this is a cell we haven't edited yet and they dont equal
            // mark the cell as wrong for a couple seconds
            if(currentBoard[x-1][y-1] != 0 && currentBoard[x-1][y-1] != solution[x-1][y-1])
            {
              let t = getCell(x,y);
              t.classList.add("markError")
              cellList.push(t);
            }
          }


          // in 3 seconds remove the marks
          setTimeout(function(){ 
            cellList.forEach(element =>{
              element.classList.remove("markError");
            })
          
          }, 3000);

      }
  


  

      // here for debugging I guess
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
  
