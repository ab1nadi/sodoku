import { useState } from 'react'
import SudokuElement from './components/sudoku_element/sudoku_element'
function App() {

  return (
    <div className="App flex justify-center bg-gradient-to-r from-cyan-200 to-blue-400 h-screen">
      <SudokuElement/>
    
    </div>
  )
}

export default App
