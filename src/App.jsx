import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from './Pages/Loginpage'
import Homepage from './Pages/Homepage'
import CreateJourneyPage from './Pages/CreateJourneyPage'
import Details from './Pages/Details'
function App() {
  return (
    <>
   <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/create" element={<CreateJourneyPage/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
