import React, { useState } from 'react';
import { Stage } from 'react-konva';

const Workspace = ({ 
    state, drawingList, setDrawingList, setDeleteList }) => {

    const [ isDrawing, setIsDrawing ] = useState(false);

    const onMouseDown = () => {
        setIsDrawing(true);
    }

    const onMouseUp = () => {
        setIsDrawing(false);
    }

    const onMouseMove = () => {
        if(!isDrawing) return ;
    }

    return (
        <Stage 
            width={window.innerWidth} 
            height={window.innerHeight}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}>

        </Stage>
    )
}

export default Workspace;