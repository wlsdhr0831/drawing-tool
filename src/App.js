import './App.css';
import Menu from './components/Menu.js';
import Workspace from './components/Workspace.js';
import React, { useState } from 'react';

function App() {
  const [ state, setState ] = useState({
    type: '',
    strokeColor: '#000000',
    fillColor: '#aaaaaa',
    size: 1,
  });

  const [ drawingList, setDrawingList ] = useState([]);
  const [ deleteList, setDeleteList ] = useState([]);

  const undo = () => {
    alert("뒤로가기");
  }

  const redo = () => {
    alert("앞으로 가기");
  }

  return (
    <div className="App">
      <Menu 
        state={state}
        setState={setState}
        undo={undo}
        redo={redo}/>
      <Workspace
        state={state}
        drawingList={drawingList}
        setDrawingList={setDrawingList}
        setDeleteList={setDeleteList}/>
    </div>
  );
}

export default App;
