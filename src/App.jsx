import { useState } from 'react'
import SudokuElement from './components/sudoku_element/sudoku_element'
function App() {

  return (
    <div className="App flex justify-center">
      <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-cyan-200 to-blue-400"></div>
      <SudokuElement/>
    
    </div>
  )
}

export default App
