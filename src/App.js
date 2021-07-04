import './App.css';
import Menu from './components/Menu.js';
import Workspace from './components/Workspace.js';
import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [ state, setState ] = useState({
    type: '',
    strokeColor: '#000000',
    fillColor: '#aaaaaa',
    size: 1,
    img: null,
  });

  const [ drawingList, setDrawingList ] = useState([]);
  const [ undoList, setUndoList ] = useState([[]]);
  const [ redoList, setRedoList ] = useState([[]]);
  const stageRef = useRef(null);

  const undo = () => {
    if(undoList.length <= 1) return;

    setRedoList([
      ...redoList,
      [ ...drawingList],
    ]);

    setDrawingList(undoList[undoList.length-1]);

    setUndoList(undoList.filter((object, i) => {
      if(i !== undoList.length-1) return object;
    }));
  };

  const redo = () => {
    if(redoList.length <= 1) return ;

    setUndoList([
      ...undoList,
      [ ...drawingList],
    ]);

    setDrawingList(redoList[redoList.length-1]);

    setRedoList(redoList.filter((object, i) => {
      if(i !== redoList.length-1) return object;
    }));
  };

  const add = () => {
    setRedoList([[]]);

    const current = drawingList;
    
    setUndoList([
      ...undoList,
      [ ...current],
    ]);
  }

  const erase = (idx) => {
    add();

    setDrawingList(drawingList.filter((object, i) => { 
        if(i !== idx) return object;
    }));
  }

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
        add={add}
        erase={erase}/>
    </div>
  );
}

export default App;
