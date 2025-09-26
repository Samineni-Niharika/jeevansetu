import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function AssignedHospitals() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [reports, setReports] = useState([]);

  const hospital = JSON.parse(localStorage.getItem("hospital"));

  const fetchReports = async () => {
    try {
      const res = await axios.get("https://waterborne-api-25.onrender.com/api/cases/");
      // Filter only reports that are assigned
      const assignedReports = res.data.filter(
        (r) => (r.role === "asha" || r.role === "community") && r.assigned_doctor
      );
      setReports(assignedReports);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
      if (currentUser) fetchReports();
    });
    return () => unsubscribe();
  }, []);

  if (loadingUser) return <p className="p-4">Loading...</p>;
  if (!user || !hospital) return <Navigate to="/" />;

  return (
    <div className="p-4 w-[55%] mx-auto mt-10 bg-white rounded shadow-md">
      <h2 className="text-3xl text-green-500 font-bold mb-4 text-center">
        Assigned Reports
      </h2>

      {reports.length === 0 ? (
        <p className="text-green-500 text-center">No assigned reports</p>
      ) : (
        reports.map((r) => (
          <div key={r.id} className="border border-gray-500  p-5 mb-4 rounded-xl">
            <p><b className="text-blue-500">Reporter:</b> {r.reporter_email}</p>
            <p><b className="text-blue-500">Patient:</b> {r.patient_name}</p>
            <p><b className="text-blue-500">Symptoms:</b> {r.symptoms}</p>
            <p><b className="text-blue-500">Status:</b> {r.status}</p>
            <p><b className="text-blue-500">Assigned Doctor:</b> {r.assigned_doctor}</p>
          </div>
        ))
      )}
    </div>
  );
}
