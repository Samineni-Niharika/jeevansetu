import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Red marker icon
const redIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Map area names to coordinates
const getLatLng = (area) => {
  const map = {
    cachar: { lat: 26.168, lng: 91.783 },
    dibrugarh: { lat: 27.471, lng: 94.818 },
    jorhat: { lat: 26.7, lng: 93.5 },
    unknown: { lat: 26.5, lng: 92.5 },
  };
  return map[area.toLowerCase()] || map.unknown;
};

// Auto fit map to markers
function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [points, map]);
  return null;
}

export default function RedAlertsMap() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await axios.get("https://waterborne-api-25.onrender.com/api/cases/");
      const cases = res.data;

      // Count cases per area
      const areaCounts = {};
      cases.forEach((c) => {
        const area = c.area_name || "Unknown";
        const normalized = area.toLowerCase();
        if (!areaCounts[normalized]) areaCounts[normalized] = 0;
        areaCounts[normalized]++;
      });

      // Only areas with more than 4 cases
      const highRiskAreas = Object.entries(areaCounts)
        .filter(([_, count]) => count > 3)
        .map(([area, count]) => {
          const coords = getLatLng(area);
          return {
            area,
            count,
            lat: coords.lat,
            lng: coords.lng,
            message: `${count} cases reported`,
          };
        });

      setAlerts(highRiskAreas);
    } catch (err) {
      console.error("Failed to fetch cases:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🔴 Red Alerts Map
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map */}
        <div className="lg:w-3/4 w-full shadow-lg rounded-lg overflow-hidden">
          <MapContainer
            center={[26.5, 92.5]}
            zoom={7}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />

            {alerts.map((alert) => (
              <Marker
                key={alert.area}
                position={[alert.lat, alert.lng]}
                icon={redIcon}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  {alert.area.toUpperCase()}: {alert.count} cases
                </Tooltip>
              </Marker>
            ))}

            <FitBounds points={alerts} />
          </MapContainer>
        </div>

        {/* Alert List */}
        <div className="lg:w-1/4 w-full flex flex-col gap-4">
          {alerts.map((alert) => (
            <div
              key={alert.area}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="font-bold text-lg text-red-600">
                {alert.area.toUpperCase()}
              </h2>
              <p className="text-gray-700">{alert.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
