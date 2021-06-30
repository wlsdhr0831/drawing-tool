import React, { useState } from 'react';
import { Stage, Layer, Line, Rect, Ellipse } from 'react-konva';

const Workspace = ({ 
    state, drawingList, setDrawingList, deleteList, setDeleteList }) => {

    const [ isDrawing, setIsDrawing ] = useState(false);
    const { type, strokeColor, fillColor, size } = state;

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
            case 'circle':
                addCircle(pos);
                break;
            case 'eraser':
                remove(e);
                break;
        }
    };

    const onMouseUp = () => {
        setIsDrawing(false);
    };

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
            case 'circle':
                makeCircle(point, lastObject);
                break;
        }
    };

    const remove = (e) => {
        if(e.target.children) return;

        const idx = e.target.index;
        setDrawingList(drawingList.filter((object, i) => { 
            if(i != idx) return object;
        }));
    }
 
    const addPen = (pos) => {
        setDrawingList([...drawingList, { 
            type, 
            points: [pos.x, pos.y],
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth: size,
            tension: 0.5,
            lineCap: 'round',
            tools: type, 
        }]); 
    };

    const addRectangle = (pos) => {
        setDrawingList([...drawingList, { 
            type, 
            x: pos.x,
            y: pos.y,
            width: 0,
            height: 0,
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth: size,
            cornerRadius: 0,
        }]); 
    };

    const addCircle = (pos) => {
        setDrawingList([...drawingList, { 
            type, 
            x: pos.x,
            y: pos.y,
            radiusX: 0,
            radiusY: 0,
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth: size,
        }]); 
    }

    const makePen = (point, lastObject) => {
        // add point
        lastObject.points = lastObject.points.concat([point.x, point.y]);
    
        // replace last
        drawingList.splice(drawingList.length - 1, 1, lastObject);
        setDrawingList(drawingList.concat());
    };

    const makeRectangle = (point, lastObject) => {
        // resize
        lastObject.width = point.x - lastObject.x;
        lastObject.height = point.y - lastObject.y;
    
        // replace last
        drawingList.splice(drawingList.length - 1, 1, lastObject);
        setDrawingList(drawingList.concat());
    };

    const makeCircle = (point, lastObject) => {
        // resize
        lastObject.radiusX = Math.abs(point.x - lastObject.x);
        lastObject.radiusY = Math.abs(point.y - lastObject.y);
    
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
            fill={object.fill}
            stroke={object.stroke}
            strokeWidth={object.strokeWidth}
            cornerRadius={object.cornerRadius}/>
    );

    const drawingCircle = (object, i) => (
        <Ellipse
            key={i}
            x={object.x}
            y={object.y}
            radiusX={object.radiusX}
            radiusY={object.radiusY}
            fill={object.fill}
            stroke={object.stroke}
            strokeWidth={object.strokeWidth}/>
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
                        case 'circle':
                            return drawingCircle(object, i);
                    }
                })}
            </Layer>
        </Stage>
    );
}

export default Workspace;