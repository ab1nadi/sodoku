class terminalGenerator 
{
    puzzle = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
    gen()
    {

        let sol = new solver();

        var total = 1;
        while(total != 12)
        {
            var col =  Math.floor(Math.random() * 9);
            var row =  Math.floor(Math.random() * 9);
            var num =  Math.floor(Math.random() * 9 + 1);
            
            
            // check if the row,col number already has that number
            // and that that number would be valid
            if(this.puzzle[row][col] == 0 && this.checkValidity(col,row,num))
             {  
                this.puzzle[row][col]=num;
                total++;
             }

        }
        sol.solve(this.puzzle);
        console.log(sol.puzzle)
        return JSON.parse(JSON.stringify(sol.puzzle));
    }

    // checks if the puzzle is full
    isPuzzleFilled()
    {
        for(var i = 0; i< this.puzzle.length; i++)
            if(this.puzzle[i].length != 9)
            return false;

        return true;
    }

    // checks the validity of a puzzle
    // with an input num at a given column and row
    checkValidity(col, row, num)
    {
        // check if that number already exists in the column
        for(var i = 0; i<9; i++)
            if(num == this.puzzle[i][col])
                return false;
        
        // check if that number already exists in the row
        for(var i = 0; i<9; i++)
            if(num == this.puzzle[row][i])
                return false;

        // blocks

        /*
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            ---------------------
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            ---------------------
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
        */

        // determine the firstElement of the block
        // we are in
        var rFirst = Math.floor(row / 3) * 3;
        var cFirst = Math.floor(col / 3) * 3;


        // loop through the block
        for(var i = 0; i< 3; i++)
            for(var z = 0; z <3; z++)
            {
                var r = rFirst + z;
                var c = cFirst + i;

                if(this.puzzle[r][c] == num)
                    return false;
            }

        return true;
    }


    print()
    {
        for(var i = 0; i< 9; i++)
        {
            console.log(this.puzzle[i][0] + " " +this.puzzle[i][1] + " " +this.puzzle[i][2] + " " +this.puzzle[i][3] + " " +this.puzzle[i][4] + " " +this.puzzle[i][5] + " " +this.puzzle[i][6] + " " +this.puzzle[i][7] + " " +this.puzzle[i][8])
        }
    }
    
}


class solver 
{
    root = null;
    start = null;
    puzzle = [];
    missing = [];


    // finds one solution
    // solve expects a multidementional array
    solve(given)
    {
        this.puzzle = JSON.parse(JSON.stringify(given))
        this.findMissing();
        this.traverse(false);
        return this.puzzle;
    }

    // is ther a solution
    doesSolExist(given)
    {
        this.puzzle = JSON.parse(JSON.stringify(given))
        this.findMissing();
        return this.traverse(false);
    }

    // finds multiple solutions
    // expects a multidimentional arration
    solveMulti(given)
    {
        this.puzzle = JSON.parse(JSON.stringify(given))
        this.findMissing();
        return this.traverse(true);
    }

    // find missing
    // finds the rows and columns off all the missing cells
    findMissing()
    {
        for(var r = 0; r<9; r++)
        {
            for(var c = 0; c<9; c++)
                if(this.puzzle[r][c] == 0)
                    this.missing.push({r:r,c:c,num: 1});
        }
    }


    // with traverse
    // you have the option of getting the multiple 
    // solutions returned value
    // or just using this.puzzle
    traverse(multiSolution)
    {
        var done = false;
        var current = 0;
        var solutions  = [];
        var solutionCNT = 0;
        while(!done)
        {
            var rc = this.missing[current];



            // find a num that is valid
            var valid = false;
            
            while(!valid)
            {
            
                // if we aren't valid we want to increment
                // the counter
                if(!this.checkValidity(rc.r,rc.c,rc.num))
                    rc.num++;
                else 
                {
                    // set the position
                    this.puzzle[rc.r][rc.c] = rc.num;     
                    valid=true;
                }

                // there is no solution for this one
                // meaning we need to back track to a previous one
                if(rc.num > 9)
                {
                    // reset this position to zero
                    // so it doesnt mess with upcoming stuff
                    this.puzzle[rc.r][rc.c] = 0;
                    break;
                }
            }  

           

            if(!valid && current == 0)
            {
                // there is no solution or we are done
                if(multiSolution)
                done= true;
                else
                return false;
            }
          
 
            // if we are still not valid we stop
            if(!valid)
            {
                rc.num = 1;
                current--;

                // so that when we loop around to the next 
                // current we are checing the next num
                this.missing[current].num++;
            }
            else 
            current++;



            
            
            // check if we have found a solution
            if(current == this.missing.length)
            {
                if(multiSolution)
                {
                    solutions.push(JSON.parse(JSON.stringify(this.puzzle)));
                    current--;
                    this.missing[current].num++;
                    this.puzzle[rc.r][rc.c] = 0;
                }
                else 
                {
                    return true;
                }
            }
            


            // we will only get to this point
            // if we are allowing mutliple solutions
            if(solutions.length == 2)
            {    
                done = true;
            }
    
        }

        return solutions;
    
    
    
    }


    // checks the validity of placing
    // a number in a given cell
    checkValidity(row,col, num)
    {
        // make a quick check on the number
        if(num > 9)
        return false;

        // check if that number already exists in the column
        for(var i = 0; i<9; i++)
            if(num == this.puzzle[i][col])
                return false;
        
        // check if that number already exists in the row
        for(var i = 0; i<9; i++)
            if(num == this.puzzle[row][i])
                return false;

        // blocks

        /*
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            ---------------------
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            ---------------------
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
        */

        // determine the firstElement of the block
        // we are in
        var rFirst = Math.floor(row / 3) * 3;
        var cFirst = Math.floor(col / 3) * 3;


        // loop through the block
        for(var i = 0; i< 3; i++)
            for(var z = 0; z <3; z++)
            {
                var r = rFirst + z;
                var c = cFirst + i;

                if(this.puzzle[r][c] == num)
                    return false;
            }

        return true;
    }

    // a special solver 
    // that checks if the solver is 
}


class puzzleGenerator
{  
    // the stuff we have seen
    canBeDug =  [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
    visited = 0;
    tg = null;
    solution = [];

    gpuzzle = null;
    totalGivens = 0;
    lowerBound = 0;
    dugCount = 0;
    constructor()
    {

        // create a terminal
        this.tg = new terminalGenerator();
        this.gpuzzle = this.tg.gen();
        this.solution = JSON.parse(JSON.stringify(this.gpuzzle))

    }   

    easy()
    {

        console.log(this.gpuzzle)

        this.lowerBound = 4;
        this.totalGivens = Math.random() * (49 - 36) + 36;

        // randomizing globally
        // make sure if we've already visited all of them we just 
        // finish
        while(this.dugCount < (80 - this.totalGivens) && this.visited != 80)
        {
            // generate a random column and row
            let c = Math.floor(Math.random() * 9);
            let r = Math.floor(Math.random() * 9);

            // check if we can even dig this one
            if(this.canBeDug[r][c] == 0)
            {
                // check the lower bound of row column
                // if we're good lets try and dig that hole
                if(this.checkLowerBound(r,c))
                {
                    // see if by remoiving this one
                    // there is not another solution
                    if(this.checkUniqu(r,c,this.gpuzzle[r][c]))
                    {
                        // dig it
                        this.gpuzzle[r][c]=0;
                        this.dugCount++;                    
                    }
                    this.visited++;
                }

                // regardless of weather we dug it or not 
                // we don't want to work with this cell again
               this.canBeDug[r][c] = 1;
               
            }

        }
        
        console.log(this.dugCount)
        console.log(this.visited)
        // assuming we made it this far
        // return the puzzle
        return JSON.parse(JSON.stringify(this.gpuzzle));
    }

    medium()
    {
        this.lowerBound = 3;
        this.totalGivens = Math.random() * (35 - 32) + 35;
        
           // randomizing globally
        // make sure if we've already visited all of them we just 
        // finish
        while(this.dugCount < (80 - this.totalGivens) && this.visited != 80)
        {
            // generate a random column and row
            let c = Math.floor(Math.random() * 9);
            let r = Math.floor(Math.random() * 9);

            // check if we can even dig this one
            if(this.canBeDug[r][c] == 0)
            {
                // check the lower bound of row column
                // if we're good lets try and dig that hole
                if(this.checkLowerBound(r,c))
                {
                    // see if by remoiving this one
                    // there is not another solution
                    if(this.checkUniqu(r,c,this.gpuzzle[r][c]))
                    {
                        // dig it
                        this.gpuzzle[r][c]=0;
                        this.dugCount++;                    
                    }
                    this.visited++;
                }

                // regardless of weather we dug it or not 
                // we don't want to work with this cell again
               this.canBeDug[r][c] = 1;
               
            }

        }
        
        console.log(this.dugCount)
        console.log(this.visited)
        // assuming we made it this far
        // return the puzzle
        return JSON.parse(JSON.stringify(this.gpuzzle));
    }

    difficult()
    {
        this.lowerBound = 2;
        this.totalGivens = Math.random() * (31 - 28) + 28;

        let c = 0;
        let r = 0;
        while(this.dugCount < (80 - this.totalGivens) && this.visited != 80)
        {

            console.log(c+ " " + r)
            // check if we can even dig this one
            if(this.canBeDug[r][c] == 0)
            {
                // check the lower bound of row column
                // if we're good lets try and dig that hole
                if(this.checkLowerBound(r,c))
                {
                    // see if by remoiving this one
                    // there is not another solution
                    if(this.checkUniqu(r,c,this.gpuzzle[r][c]))
                    {
                        // dig it
                        this.gpuzzle[r][c]=0;
                        this.dugCount++;                    
                    }
                    this.visited++;
                }

                // regardless of weather we dug it or not 
                // we don't want to work with this cell again
               this.canBeDug[r][c] = 1;
               
            }

            if(r == 0)
            {
                c += Math.floor(Math.random() * 3 + 1);;

                if(c > 8)
                {
                    r++;
                    c = 8;
                }
            }

            else if(r == 1)
            {
                c -= Math.floor(Math.random() * 3 + 1);;
                if(c < 0)
                {
                    r++;
                    c=0;
                }
            }

            else if( r % 2 == 0)
            {
                c += Math.floor(Math.random() * 3 + 1);
                if(c > 8)
                {
                    r++;
                    c = 8
                }
            }
            else 
            {
                c -= Math.floor(Math.random() * 3 + 1);
                if(c < 0)
                {
                    r++;
                    c = 0;
                }
            }

            if(r == 9)
            {
                r = 0;
                c = Math.floor(Math.random()* 3);
            }


        }
        
        console.log(this.dugCount)
        console.log(this.visited)
        // assuming we made it this far
        // return the puzzle
        return JSON.parse(JSON.stringify(this.gpuzzle));
    }

    evil()
    {
        this.lowerBound = 0;
        this.totalGivens = Math.random() * (27 - 22) + 22;


        let c = 0;
        let r = 0;
        while(this.dugCount < (80 - this.totalGivens) && this.visited != 80)
        {

            console.log(c+ " " + r)
            // check if we can even dig this one
            if(this.canBeDug[r][c] == 0)
            {
                // check the lower bound of row column
                // if we're good lets try and dig that hole
                if(this.checkLowerBound(r,c))
                {
                    // see if by remoiving this one
                    // there is not another solution
                    if(this.checkUniqu(r,c,this.gpuzzle[r][c]))
                    {
                        // dig it
                        this.gpuzzle[r][c]=0;
                        this.dugCount++;                    
                    }
                    this.visited++;
                }

                // regardless of weather we dug it or not 
                // we don't want to work with this cell again
               this.canBeDug[r][c] = 1;
               
            }

            c += Math.floor(Math.random() * 3);

            if(c > 8)
            {
                c = 0
                r++;
            }

            if(r > 8)
            {   
                r = 0;
            }


        }
        
        // assuming we made it this far
        // return the puzzle
        return JSON.parse(JSON.stringify(this.gpuzzle));
    }


    // check puzzle uniqueness
    // when we insert every other 
    // number then num
    // in r,c
    checkUniqu(r,c,num)
    {
        var solv = new solver();

        // if we find a solution for 
        // all numbers other then num
        // this is not a good number
        for(var i = 1; i< 10; i++)
        {
            if(i != num)
            {
                // 
                if(this.checkValidity(r,c,i))
                {   
                    this.gpuzzle[r][c] = i;

                    if(solv.doesSolExist(this.gpuzzle))
                    {
                        // reset that position in the 
                        // puzzle and return falsee
                        this.gpuzzle[r][c] = num;
                        return false;
                    }
                    else 
                    this.gpuzzle[r][c] = 0;
                }
            }
        }

        return true;

    }

    checkLowerBound(r,c)
    {
        // check row
        var rowCount = 0;
        for(var i = 0; i<9; i++)
        {
            if(this.gpuzzle[r][i ]!= 0)
            rowCount++;
        }

        if(rowCount <this.lowerBound)
            return false;

        // check columns
        var colCount = 0;
        for(var i = 0; i<9; i++)
        {
            if(this.gpuzzle[c][i] != 0)
            colCount++;
        }

        if(colCount < this.lowerrBound)
        return false;

        // if everything worked out 
        // we return true;
        return true;
    }


    // check validity
    checkValidity(row,col, num)
    {
        // make a quick check on the number
        if(num > 9)
        return false;

        // check if that number already exists in the column
        for(var i = 0; i<9; i++)
            if(num == this.gpuzzle[i][col])
                return false;
        
        // check if that number already exists in the row
        for(var i = 0; i<9; i++)
            if(num == this.gpuzzle[row][i])
                return false;

        // blocks

        /*
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            ---------------------
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            ---------------------
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
            0 0 0 | 0 0 0 | 0 0 0
        */

        // determine the firstElement of the block
        // we are in
        var rFirst = Math.floor(row / 3) * 3;
        var cFirst = Math.floor(col / 3) * 3;


        // loop through the block
        for(var i = 0; i< 3; i++)
            for(var z = 0; z <3; z++)
            {
                let r = rFirst + z;
                let c = cFirst + i;

                if(this.gpuzzle[r][c] == num)
                    return false;
            }

        return true;
    }

}

