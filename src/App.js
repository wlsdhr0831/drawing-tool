import './App.css';
import Menu from './components/Menu.js';
import Workspace from './components/Workspace.js';
import React, { useState, useRef } from 'react';

function App() {
  const [ state, setState ] = useState({
    type: '',
    strokeColor: '#000000',
    fillColor: '#aaaaaa',
    size: 1,
  });

  const [ drawingList, setDrawingList ] = useState([]);
  const [ deleteList, setDeleteList ] = useState([]);
  const stageRef = useRef(null);

  const undo = () => {
    alert("뒤로가기");
  };

  const redo = () => {
    alert("앞으로 가기");
  };

  const downloadURI = (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const exportImage = () => {
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, 'image.jpg');
  };

  return (
    <div className="App">
      <Menu 
        state={state}
        setState={setState}
        undo={undo}
        redo={redo}
        exportImage={exportImage}/>
      <Workspace
        stageRef={stageRef}
        state={state}
        drawingList={drawingList}
        setDrawingList={setDrawingList}
        deleteList={deleteList}
        setDeleteList={setDeleteList}/>
    </div>
  );
}

export default App;
