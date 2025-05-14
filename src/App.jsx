import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./Pages/Loginpage";
import Homepage from "./Pages/Homepage";
import CreateJourneyPage from "./Pages/CreateJourneyPage";
import Details from "./Pages/Details";
import AuthForm from "./Pages/AuthForm";
import Shipments from "./Pages/Shipments";
import CreateShipment from "./Pages/CreateShipment";
import Layout from "./Layout";
import SentRequest from "./Pages/sentRequest";
import ReceivedRequest from "./Pages/ReceivedRequest";
import CreateSpaceRequest from "./Pages/CreateSpaceRequest";
import MyJourney from "./Pages/MyJourney";
import Dashboard from "./Pages/Dashboard";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route element={<Layout />}>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/sentRequest" element={<SentRequest />} />
            <Route path="/receivedRequest" element={<ReceivedRequest />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/create" element={<CreateJourneyPage />} />
            <Route path="/shipments/:id" element={<Shipments />} />
            <Route path="/createShipment" element={<CreateShipment />} />
            <Route
              path="/createspaceRequest"
              element={<CreateSpaceRequest />}
            />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/MyJourney" element={<MyJourney />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
