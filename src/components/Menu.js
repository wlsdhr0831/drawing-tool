import { useRef } from 'react';
import styles from './Menu.module.css';

const Menu = ({ state, setState, undo, redo, exportImage }) => {
    const inputRef = useRef();

    const changeType = (e) => {
        const { id } = e.target;

        setState({
            ...state,
            type: id,
        });
    };

    const change = (e)  => {
        const { name, value } = e.target;

        setState({
            ...state,
            [name]: value,
        });
    };

    const importImage = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };

    const selectImage = (e) => {
        if(!e.target.files) return ;
        
        const img = e.target.files[0];
        setState({
            ...state,
            type: 'image',
            img,
        });
    };

    return (
        <div className={styles.menu}>
            <button onClick={undo}>←</button>
            <button onClick={redo}>→</button>
            <button onClick={exportImage}>💾</button>
            <button onClick={importImage}>🖼</button>
            <input 
                type="file"
                ref={inputRef}
                className={styles.import_image}
                onChange={selectImage}/>
            <button
                id="eraser"
                onClick={changeType}>🗑</button>
            <button 
                id="pen"
                onClick={changeType}>🖋</button>
            <button
                id="circle"
                onClick={changeType}>⚪</button>
            <button
                id="rectangle"
                onClick={changeType}>⬜</button>
            <button
                id="star"
                onClick={changeType}>☆</button>
            <span>선 두께</span>
            <input 
                name="size"
                onChange={change}
                value={state.size}/>
            <span>선</span>
            <input
                name="strokeColor"
                type="color"
                className={styles.color}
                onChange={change}
                value={state.strokeColor}/>
            <span>채우기</span>
            <input
                name="fillColor"
                type="color"
                className={styles.color}
                onChange={change}
                value={state.fillColor}/>
        </div>
    );
}

export default Menu;