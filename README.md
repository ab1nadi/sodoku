# Sudoku
A react website that generates playable sudoku puzzles. Puzzles are saved between sessions using sessionstorage. The puzzles are generated utilizing a solver to create a puzzle with a unique solution, then it digs holes in that solution based on the wanted difficulty. The algorithms I used for digging holes in the puzzle can be viewed here:  http://zhangroup.aporc.org/images/files/Paper_3485.pdf. 
The game is playable at: https://ab1nadi.github.io/sudoku/ .

## Getting Started
To get a local copy of the website up and running, follow these steps:

1. **Clone the repsitory:**
```bash
git clone https://github.com/ab1nadi/sudoku.git
```
2. **Navigate to the project directory:**
```bash
cd sudoku
```
3. **Install the dependencies**
```bash
npm install
```
4. **Start the development server:**
```
npm run dev
```

## Playing the game
   
 * ### Movement of highlighted square
 Movement is as easy as using the mouse, the arrow keys, or using the 'a', 's', 'd', and 'w' keys.
 The square currently being worked on is highlighted.

 * ### Note Mode
 Note mode allows you to make notes on square. You can enter note mode by either pressing 'n' or clicking the note button, signified by a pencil. 

 * ### Clearing a Square 
 To clear the current highlighted square press the 'c' button or click the 'x' button on the screen. 

 


