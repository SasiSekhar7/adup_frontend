import RewardLandingPage from "./pages/Home"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RewardLandingPage />}/>
      </Routes>
    </Router>

  )
}

export default App
