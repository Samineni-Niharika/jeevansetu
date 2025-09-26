import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

export default function Viewreports() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
    });

    // Fetch cases only after user state is loaded
    if (!user) {
      fetchCases();
    }

    return () => unsubscribe();
  }, [user]); // Add 'user' dependency

  const fetchCases = async () => {
    try {
      const res = await axios.get("https://waterborne-api-25.onrender.com/api/cases/");
      console.log("Fetched cases:", res.data);

      // Filter reports submitted by Asha workers (case-insensitive)
      const ashaReports = res.data.filter(
        (c) => c.role && c.role.toLowerCase() === "asha"
      );

      setCases(ashaReports);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    }
  };

  if (loadingUser) return <p className="p-4">Loading...</p>;
  if (!user)
    return <p className="p-4 text-red-500">Please log in to view reports</p>;
console.log(cases)
  return (
    <div className="mt-4 p-6">
      <h2 className="text-lg font-bold mb-5 text-center">
        All Reports Submitted by Asha Workers
      </h2>

      {cases.length === 0 ? (
        <p className="text-gray-500 text-center">No reports yet.</p>
      ) : (
        
        cases.map((c) => (
          
          <div
            key={c.id}
            className="border border-gray-300 w-2/4 mx-auto p-4 mb-3 rounded shadow-sm"
          >
            <p><b>Reporter:</b> {c.reporter_email}</p>
            <p><b>Patient:</b> {c.patient_name}</p>
            <p><b>Symptoms:</b> {c.symptoms}</p>
            <p><b>Status:</b> {c.status}</p>
            <p><b>Area:</b> {c.area_name}</p>
            <p><b>Assigned Doctor:</b> {c.assigned_doctor || "Not assigned"}</p>
          </div>
        ))
      )}
    </div>
  );
}
