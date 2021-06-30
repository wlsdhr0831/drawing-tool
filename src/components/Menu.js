const Menu = ({ state, setState, undo, redo }) => {

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
        <div>
            <button onClick={undo}>뒤로 돌리기</button>
            <button onClick={redo}>앞으로 돌리기</button>
            <button
                id="eraser"
                onClick={changeType}>지우개</button>
            <button
                id="move"
                onClick={changeType}>손</button>
            <button 
                id="pen"
                onClick={changeType}>펜</button>
            {/* <button 
                id="line"
                onClick={changeType}>직선</button>
            <button
                id="curve"
                onClick={changeType}>곡선</button> */}
            <button
                id="circle"
                onClick={changeType}>원</button>
            <button
                id="rectangle"
                onClick={changeType}>직사각형</button>
            {/* <button
                id="multiangle"
                onClick={changeType}>다각형</button> */}
            <span>선 두께</span>
            <input 
                name="size"
                onChange={change}
                value={state.size}/>
            <span>선 색상</span>
            <input
                name="color"
                onChange={change}
                value={state.strokeColor}/>
            <span>채우기 색상</span>
            <input
                name="color"
                onChange={change}
                value={state.fillColor}/>
        </div>
    )
}

export default Menu;