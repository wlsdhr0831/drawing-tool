import React, { useState } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';

const Workspace = ({ 
    state, drawingList, setDrawingList, setDeleteList }) => {

    const [ isDrawing, setIsDrawing ] = useState(false);
    const { type, color, size } = state;

    const onMouseDown = (e) => {
        setIsDrawing(true);

        const pos = e.target.getStage().getPointerPosition();

        switch(type){
            case 'pen':
                addPen(pos);
                break;
            case 'rectangle':
                addRectangle(pos);
                break;
        }
    }

    const onMouseUp = () => {
        setIsDrawing(false);
    }

    const onMouseMove = (e) => {
        if(!isDrawing) return ;
        
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastObject = drawingList[drawingList.length - 1];

        switch(type){
            case 'pen':
                makePen(point, lastObject);
                break;
            case 'rectangle':
                makeRectangle(point, lastObject);
                break;
        }
    }
 
    const addPen = (pos) => {
        setDrawingList([...drawingList, { 
            type, 
            points: [pos.x, pos.y],
            stroke: color,
            strokeWidth: size,
            tension: 0.5,
            lineCap: 'round',
            tools: type, 
        }]); 
    }

    const addRectangle = (pos) => {
        setDrawingList([...drawingList, { 
            type, 
            x: pos.x,
            y: pos.y,
            width: 0,
            height: 0,
            stroke: color,
            strokeWidth: size,
            cornerRadius: 0,
        }]); 
    }

    const makePen = (point, lastObject) => {
        // add point
        lastObject.points = lastObject.points.concat([point.x, point.y]);
    
        // replace last
        drawingList.splice(drawingList.length - 1, 1, lastObject);
        setDrawingList(drawingList.concat());
    }

    const makeRectangle = (point, lastObject) => {
        // resize
        lastObject.width = point.x - lastObject.x;
        lastObject.height = point.y - lastObject.y;
    
        // replace last
        drawingList.splice(drawingList.length - 1, 1, lastObject);
        setDrawingList(drawingList.concat());
    }

    const drawingPen = (object, i) => (
        <Line
            key={i}
            points={object.points}
            stroke={object.stroke}
            strokeWidth={object.strokeWidth}
            tension={object.tension}
            lineCap={object.lineCap}
            globalCompositeOperation={
                object.tool === 'eraser' ? 'destination-out' : 'source-over' 
            }/>
    );

    const drawingRectangle = (object, i) => (
        <Rect
            key={i}
            x={object.x}
            y={object.y}
            width={object.width}
            height={object.height}
            stroke={object.stroke}
            strokeWidth={object.strokeWidth}
            cornerRadius={object.cornerRadius}/>
    )

    return (
        <Stage 
            width={window.innerWidth} 
            height={window.innerHeight}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}>
            <Layer>
                {drawingList.map(( object, i) => {
                    switch(object.type){
                        case 'pen':
                            return drawingPen(object, i);
                        case 'rectangle':
                            return drawingRectangle(object, i);
                    }
                })}
            </Layer>
        </Stage>
    )
}

export default Workspace;