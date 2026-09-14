import "./Body.css";
import { useState } from "react";

function Viewer({number}) {
    console.log('Viewer 렌더링');
    return <div>{number%2 === 0? <h3>짝수</h3> : <h3>홀수</h3>}</div>
}

function Viewer2() {
    console.log('Viewer렌더링');
    return <div>Viewer2</div>
}

function Body2() {
    console.log('Body2렌더링');
    const [number, setNumber] = useState(0);
    const onIncrease = () => {
        setNumber(number+1);
    }

    const onDecrease = () => {
        setNumber(number-1);
    }

    return (
        <>
            <div className="body">
                <h2>{number}</h2>
                <Viewer number={number} />

                <div>
                    <button onClick={onDecrease}>-</button>
                    <button onClick={onIncrease}>+</button>
                </div>
            </div>
        </>
    )
}

export default Body2;