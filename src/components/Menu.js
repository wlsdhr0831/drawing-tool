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
                id="line"
                onClick={changeType}>직선</button>
            <button
                id="curve"
                onClick={changeType}>곡선</button>
            <button
                id="circle"
                onClick={changeType}>원</button>
            <button
                id="rectangle"
                onClick={changeType}>직사각형</button>
            <button
                id="multiangle"
                onClick={changeType}>다각형</button>
            <span>선 두께</span>
            <input 
                name="size"
                onChange={change}
                value={state.size}/>
            <span>색상</span>
            <input
                name="color"
                onChange={change}
                value={state.color}/>
            <button
                id="eraser"
                onClick={changeType}>지우개</button>
        </div>
    )
}

export default Menu;