import './App.css'
import Field from './components/Field/Field'
import NavBar from './components/NavBar/NavBar'
import GameOverModal from './components/Modal/Modal'
function App() {


  return (
    
    <div className='appContainer'>
      <NavBar/>
      <Field/>
      <GameOverModal/>
    </div>
  )
}

export default App
