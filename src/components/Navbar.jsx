
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Health Dashboard</h1>
      <div className="flex items-center space-x-6">
        <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-200 transition">Home</Link>
            <Link to="/ashaworkers" className="hover:text-gray-200 transition">ASHAWorker</Link>
            <Link to="/viewreports" className="hover:text-gray-200 transition">ViewReports</Link>
            <Link to="/hospitals" className="hover:text-gray-200 transition">Hospitals</Link>
            <Link to="/assigned-hospitals" className="hover:text-gray-200 transition">Assigned Hospitals</Link>
            <Link to="/red-alerts" className="hover:text-gray-200 transition">Red Alerts</Link>
           
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
