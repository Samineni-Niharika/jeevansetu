
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import pic from "../assets/pic.png"

export default function Navbar() {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md px-12 py-5 flex justify-between items-center">
      {/* <h1 className="font-bold text-xl">Health Dashboard</h1> */}
      <img src={pic} alt="" className="w-[80px] gap-4 rounded-full " />
      <div className="flex items-center space-x-6">
        <div className="hidden text-lg md:flex w-[95%] space-x-6">
            <Link to="/" className="hover:text-gray-200 transition">Home</Link>
            <Link to="/ashaworkers" className="hover:text-gray-200 transition">ASHAWorker</Link>
            <Link to="/viewreports" className="hover:text-gray-200 transition">ViewReports</Link>
            <Link to="/hospitals" className="hover:text-gray-200 transition">Hospitals</Link>
            <Link to="/assigned-hospitals" className="hover:text-gray-200 transition">AssignedReports</Link>
            <Link to="/red-alerts" className="hover:text-gray-200 transition">Alerts</Link>
           
          </div>
        {user && (
          <div className="flex items-center space-x-2">
            <span className="text-sm">{user.email}</span>
            <button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 transition text-white text-sm">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
