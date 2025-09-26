import { useLocation, useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;

  if (!email) return <p className="p-4 text-red-500">Unauthorized access. Please login.</p>;

  const handleRole = (role) => {
    if (role === "asha" || role === "community") {
      navigate("/asha", { state: { email, role } });
    } else if (role === "hospital") {
      navigate("/hospital", { state: { email, role } });
    }
  };

  return (
    <div className="p-4 w-80 mx-auto mt-20 bg-white rounded shadow-md text-center">
      <h2 className="text-xl font-bold mb-4">Select Your Role</h2>
      <button onClick={() => handleRole("asha")} className="w-full bg-green-600 text-white py-2 mb-2 rounded">Asha Worker</button>
      <button onClick={() => handleRole("community")} className="w-full bg-yellow-600 text-white py-2 mb-2 rounded">Local Community</button>
      <button onClick={() => handleRole("hospital")} className="w-full bg-blue-600 text-white py-2 rounded">Hospital</button>
    </div>
  );
}
