import React, { useEffect, useState } from 'react';
import { Stage, Layer, Line, Rect, Ellipse, Image } from 'react-konva';
import useImage from 'use-image';

const Workspace = ({ 
    stageRef, state, drawingList, setDrawingList, setDeleteList }) => {

    const [ isDrawing, setIsDrawing ] = useState(false);
    const { type, strokeColor, fillColor, size } = state;

    useEffect(() => {
        if(state.type === 'image') {
            const url = URL.createObjectURL(state.img);
            addImage(url);
        }
    }, [state]);

    const onMouseDown = (e) => {
        const pos = e.target.getStage().getPointerPosition();

        switch(type){
            case 'pen':
                setIsDrawing(true);
                addPen(pos);
                break;
            case 'rectangle':
                setIsDrawing(true);
                addRectangle(pos);
                break;
            case 'circle':
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
        
        setDeleteList([]);
        
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
            if(i !== idx) return object;
        }));
    }
 
    const addImage = (url) => {
        // console.log(url);
        
        const [image] = useImage('https://konvajs.org/assets/lion.png');

        setDrawingList([...drawingList, { 
            type, 
            x: 0,
            y: 0,
            image: image,
            width: 100,
            height: 100,
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

    const DrawingImage = (object, i) => (
        <Image
            key={i}
            x={object.x}
            y={object.y}
            image={object.image}
            width={object.width}
            height={object.height}/>
    );

    const DrawingPen = (object, i) => (
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

    const DrawingRectangle = (object, i) => (
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

    const DrawingCircle = (object, i) => (
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
            ref={stageRef}
            width={window.innerWidth} 
            height={window.innerHeight}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}>
            <Layer>
                {drawingList.map(( object, i) => {
                    switch(object.type){
                        case 'pen':
                            return <DrawingPen object={object} i={i}/>;
                        case 'rectangle':
                            return <DrawingRectangle object={object} i={i}/>;
                        case 'circle':
                            return <DrawingCircle object={object} i={i}/>;
                        case 'image':
                            return <DrawingImage object={object} i={i}/>;
                    }
                })}
            </Layer>
        </Stage>
    );
}

export default Workspace;