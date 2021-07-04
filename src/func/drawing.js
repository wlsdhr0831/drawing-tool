import { Line, Rect, Ellipse, Image, Star } from 'react-konva';
import useImage from 'use-image';

const DrawingImage = ({ object }) => {
    const [image] = useImage(object.image);

    return <Image
        x={object.x}
        y={object.y}
        image={image}
        width={object.width}
        height={object.height}
        draggable={true}/>
};

export default DrawingImage; 

export const drawingPen = (object, i) => (
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

export const drawingRectangle = (object, i) => (
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

export const drawingCircle = (object, i) => (
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

export const drawingStar = (object, i) => (
    <Star
        key={i}
        x={object.x}
        y={object.y}
        numPoints={object.numPoints}
        innerRadius={object.innerRadius}
        outerRadius={object.outerRadius}
        fill={object.fill}
        stroke={object.stroke}
        strokeWidth={object.strokeWidth}/>
)