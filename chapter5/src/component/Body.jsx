import {use, useState} from 'react';

function Body() {
  // const [name, setName] = useState('');
  // const [gender, setGender] = useState('');
  // const [birth, setBirth] = useState('');
  // const [bio, setBio] = useState('');

  const [state, setState] = useState({
    name: '',
    gender: '',
    birth:'',
    bio:''
  });

  const handleOnChange = (e) => {
    console.log('현재 수정 대상: ', e.target.name);
    console.log('수정값:',e.target.value);
    setState({
        ...state,
        [e.target.name]: e.target.value,
    });
  };

  // const onChangeName = (e) => {
  //  setName(e.target.value);
  // };

  // const onChangeGender = (e) => {
  //  setGender(e.target.value);
  // };

  // const onChangeBirth = (e) => {
  //   setBirth(e.target.value);
  // };

  // const onChangeBio = (e) => {
  //   setBio(e.target.value);
  // };

  return (
    <div>
    <div className="body">
        <div>
            <input name = "name" value={state.name} onChange={handleOnChange}placeholder='이름'/>
        </div>
        <div>
            <select name="gender" value={state.gender} onChange={handleOnChange}>
                <option key={""}></option>
                <option key={"남성"}></option>
                <option key={"여성"}></option>
            </select>
        </div>
        <div>
            <input type="date" value={state.birth} onChange={handleOnChange} />
        </div>
        <div>
            <textarea value={state.bio} onChange={handleOnChange}/>
        </div>
    </div>
    </div>
  );
}

export default Body;