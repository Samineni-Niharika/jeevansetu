import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import hospitals from "./listhosp";

export default function LoginWithRole() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    if (selectedRole !== "hospital") setSelectedHospital("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setError("Please fill all fields and select a role");
      return;
    }

    if (role === "hospital" && !selectedHospital) {
      setError("Please select a hospital");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Save role, email, and hospital in localStorage
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);
      if (role === "hospital") {
        const hospitalObj = hospitals.find(h => h.id === parseInt(selectedHospital));
        localStorage.setItem("hospital", JSON.stringify(hospitalObj));
      }

      // Navigate based on role
      if (role === "asha" || role === "community") {
        navigate("/ashaworkers");
      } else if (role === "hospital") {
        navigate("/hospitals");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Check credentials.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 w-96 mx-auto mt-10 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <select
        value={role}
        onChange={handleRoleChange}
        className="border p-2 w-full mb-4"
      >
        <option value="">Select Role</option>
        <option value="asha">Asha Worker</option>
        <option value="community">Community Worker</option>
        <option value="hospital">Hospital</option>
      </select>

      {role === "hospital" && (
        <select
          value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="">Select Hospital</option>
          {hospitals.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name} - {h.city}, {h.state}
            </option>
          ))}
        </select>
      )}

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
}
