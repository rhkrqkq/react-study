import { useState, useRef } from "react";

function Body3() {
    console.log('Body3 렌더링');
    const [text, setText] = useState('');
    const textRef = useRef();

    const handleOnChange = (e) => {
        setText(e.target.value);
    };

    const handleOnClick = () => {
        if (text.length<5) {
            textRef.current.focus();
        } else {
            alert(text);
            textRef.current.value='';
            // setText('');
        }
    };

    return (
        <div className="body">
            <input ref={textRef} value={text} onChange={handleOnChange} />
            <button onClick={handleOnClick}>작성 완료</button>
        </div>
    )
}

export default Body3;