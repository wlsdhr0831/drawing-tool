import styles from './Menu.module.css';

const Menu = ({ state, setState, undo, redo, exportImage }) => {

    const changeType = (e) => {
        const { id } = e.target;

        setState({
            ...state,
            type: id,
        });
    }

    const change = (e)  => {
        const { name, value } = e.target;

        setState({
            ...state,
            [name]: value,
        });
    }

    return (
        <div className={styles.menu}>
            <button onClick={undo}>←</button>
            <button onClick={redo}>→</button>
            {/* <button onClick={}>📷🔍</button> */}
            <button onClick={exportImage}>💾</button>
            <button
                id="eraser"
                onClick={changeType}>🗑</button>
            {/* <button
                id="move"
                onClick={changeType}>🖐🏻</button> */}
            <button 
                id="pen"
                onClick={changeType}>🖋</button>
            {/* <button 
                id="line"
                onClick={changeType}>직선</button>
            <button
                id="curve"
                onClick={changeType}>곡선</button> */}
            <button
                id="circle"
                onClick={changeType}>⚪</button>
            <button
                id="rectangle"
                onClick={changeType}>⬜</button>
            {/* <button
                id="multiangle"
                onClick={changeType}>다각형</button> */}
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
    )
}

export default Menu;