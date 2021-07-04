import React, { useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import DrawingImage, { drawingPen, drawingRectangle, drawingCircle } from '../func/drawing';

const Workspace = ({ 
    stageRef, state, drawingList, setDrawingList, add, erase }) => {

    const [ isDrawing, setIsDrawing ] = useState(false);
    const { type, strokeColor, fillColor, size } = state;

    useEffect(() => {
        if(state.type === 'image' && state.img) {
            addImage(state.img);        
        }
    }, [state]);

    const onMouseDown = (e) => {
        const pos = e.target.getStage().getPointerPosition();

        switch(type){
            case 'pen':
                add();
                setIsDrawing(true);
                addPen(pos);
                break;
            case 'rectangle':
                add();
                setIsDrawing(true);
                addRectangle(pos);
                break;
            case 'circle':
                add();
                setIsDrawing(true);
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
        erase(idx);
    }
 
    const addImage = (image) => {
        setDrawingList([...drawingList, { 
            type, 
            x: 0,
            y: 0,
            image: URL.createObjectURL(image),
            width: 300,
            height: 300,
        }]); 
    };

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

    return (
        <Stage 
            ref={stageRef}
            width={window.innerWidth} 
            height={window.innerHeight}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}>
            <Layer>
                {drawingList && drawingList.map(( object, i) => {
                    switch(object.type){
                        case 'pen':
                            return drawingPen(object, i);
                        case 'rectangle':
                            return drawingRectangle(object, i);
                        case 'circle':
                            return drawingCircle(object, i);
                        case 'image':
                            return <DrawingImage key={i} object={object}/>;
                    }
                })}
            </Layer>
        </Stage>
    );
}

export default Workspace;