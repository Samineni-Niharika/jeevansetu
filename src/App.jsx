import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AshaWorkers from "./pages/AshaWorkers";
import Hospitals from "./pages/Hospitals";
import AssignedHospitals from "./pages/AssignedHospitals";
import RedAlertMap from "./pages/RedAlertMap";
import RoleSelect from  "./pages/RoleSelect";
import Viewreports from "./pages/Viewreports";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              
           <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/ashaworkers" element={<AshaWorkers />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/assigned-hospitals" element={<AssignedHospitals />} />
       <Route path="/red-alerts" element={<RedAlertMap />} />
       <Route path="/viewreports" element={<Viewreports/>}/>

      </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

