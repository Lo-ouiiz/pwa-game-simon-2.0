import Simon from './components/simon/Simon'
import './App.scss'
import InstallButton from './components/install-button/InstallButton'
import Scores from './components/scores/scores'

function App() {

  return (
    <>
      <InstallButton />
      <Simon />
      <Scores />
    </>
  )
}

export default App
