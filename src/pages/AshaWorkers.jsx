import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function AshaWorkers() {
  // Get role and email from localStorage
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [patientName, setPatientName] = useState("");
  const [AreaName, setAreaName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Check Firebase user authentication
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  if (loadingUser) return <p className="p-4">Loading...</p>;

  // Block unauthorized access
  if (!user || !role || !["asha", "community"].includes(role)) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientName || !symptoms) return alert("Please fill all fields");

    try {
      setLoading(true);
      await axios.post("https://waterborne-api-25.onrender.com/api/cases/", {
        reporter_email: email,
        role: role,
        patient_name: patientName,
        symptoms: symptoms,
         area_name: AreaName, 
        assigned_doctor: null,
        status: "unassigned",
      });
      setSuccessMsg("Case submitted successfully!");
      setPatientName("");
      setSymptoms("");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to submit case. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-96 mx-auto mt-10 bg-white rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center">Report Symptoms</h2>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Area Name"
          value={AreaName}
          onChange={(e) => setAreaName(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <textarea
          placeholder="Symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        {successMsg && <p className="text-green-500 mb-2 text-center">{successMsg}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
