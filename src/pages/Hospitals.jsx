import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Hospitals() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [reports, setReports] = useState([]);
  const [assigningIds, setAssigningIds] = useState([]);

  // Get hospital info and role from localStorage
  const hospital = JSON.parse(localStorage.getItem("hospital"));
  const role = localStorage.getItem("role"); // should be "hospital" for hospitals

  const fetchReports = async () => {
    try {
      const res = await axios.get("https://waterborne-api-25.onrender.com/api/cases/");
      const filtered = res.data.filter(
        (r) =>
          (r.role === "asha" || r.role === "community") &&
          r.status === "unassigned"
      );
      setReports(filtered);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
      if (currentUser && role === "hospital") fetchReports();
    });
    return () => unsubscribe();
  }, [role]);

  if (loadingUser) return <p className="p-4">Loading...</p>;

  // Only allow if role is hospital and hospital info exists
  if (!user || !hospital || role !== "hospital") return <Navigate to="/" />;

  const assignToMe = async (reportId) => {
    try {
      setAssigningIds((prev) => [...prev, reportId]);
      await axios.patch(`https://waterborne-api-25.onrender.com/api/cases/${reportId}/`, {
        assigned_doctor: hospital.name,
        status: "assigned",
      });
      setReports((prev) => prev.filter((r) => r.id !== reportId));
    } catch (err) {
      console.error("Failed to assign report:", err);
    } finally {
      setAssigningIds((prev) => prev.filter((id) => id !== reportId));
    }
  };

  return (
    <div className="p-4 w-[55%] mx-auto mt-10 bg-white rounded shadow-md">
      <h2 className="text-3xl text-green-500 font-bold mb-4 text-center">Unassigned Reports</h2>

      {reports.length === 0 && (
        <p className="text-green-500 text-center">No unassigned reports</p>
      )}

      {reports.map((r) => (
        <div key={r.id} className="border border-gray-500 p-5 mb-4 rounded-xl">
          <p><b className="text-blue-500">Reporter:</b> {r.reporter_email}</p>
          <p><b className="text-blue-500">Patient:</b> {r.patient_name}</p>
          <p><b className="text-blue-500">Symptoms:</b> {r.symptoms}</p>
          <p><b className="text-blue-500">Status:</b> {r.status}</p>
          <p><b className="text-blue-500">Area:</b> {r.area_name}</p>
          <p><b className="text-blue-500">Assigned Doctor:</b> {r.assigned_doctor || "Not assigned"}</p>
          <button
            onClick={() => assignToMe(r.id)}
            disabled={assigningIds.includes(r.id)}
            className="bg-green-500 text-white px-2 py-1 rounded mt-2 hover:bg-green-700"
          >
            {assigningIds.includes(r.id) ? "Assigning..." : "Assign to me"}
          </button>
        </div>
      ))}
    </div>
  );
}
