import './App.css'
import Header from './component/Header.jsx'
import Body from './component/Body.jsx'
import Body2 from './component/Body2.jsx'
import Body3 from './component/Body3.jsx'
import Footer from './component/Footer.jsx'

function ChildComp() {
  return <div>child component</div>;
}

function App() {
  const bodyProps = {
    name: "이정환",
    age: 25,
    // favorList: ['파스타', '빵', '떡볶이']
  };

  return (
    <div className="App">
      <Header />
      <Body3/>
      <Body2/>
      <Body {...bodyProps}>
        <ChildComp />
      </Body>
      
      <Footer />
    </div>
  );
}

export default App;