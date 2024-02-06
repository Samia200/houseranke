import './App.css';
import bg_img  from './assets/bg.jpg';
import List from './components/liste'


function App() {
  return (
    <div className="App">
      <img className="img" src={bg_img} alt='bg'/>
       <List/> 

    </div>
  );
}

export default App;
