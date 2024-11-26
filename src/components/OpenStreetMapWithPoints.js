import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import dataPlace from "../data/DataPlace.json";
import Pin1 from "../icons/location-pin.png";
import Pin2 from "../icons/location-pin2.png";

const OpenStreetMapWithLocations = () => {
  const navigate = useNavigate();

  const locations = dataPlace;

  const calculateParkedVehicles = (parkedVehicles) => {
    return parkedVehicles.small + parkedVehicles.medium + parkedVehicles.large;
  };

  const checkAvailability = (capacity, parkedVehicles) => {
    const totalParked = calculateParkedVehicles(parkedVehicles);
    return totalParked < capacity;
  };

  const handleViewDetails = (location) => {
    navigate(`/booking/${location.id}`, { state: location });
  };

  return (
    <MapContainer
      center={[-6.217419255905705, 106.8064718258548]}
      zoom={16}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((loc) => {
        const totalParked = calculateParkedVehicles(loc.parkedVehicles);
        const isAvailable = checkAvailability(loc.capacity, loc.parkedVehicles);

        const iconUrl = isAvailable ? Pin2 : Pin1;

        const customIcon = new L.Icon({
          iconUrl: iconUrl,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        return (
          <Marker key={loc.id} position={loc.position} icon={customIcon}>
            <Popup className="popup-content">
              <h3 className="text-xl font-semibold text-blue-600">
                {loc.name}
              </h3>
              <p className="text-sm text-gray-700 mt-1">
                Total Kendaraan Parkir: {totalParked}/{loc.capacity}
              </p>
              <p
                className={`text-sm mt-2 ${
                  isAvailable ? "text-green-500" : "text-red-500"
                }`}
              >
                Status: {isAvailable ? "Tersedia" : "Penuh"}
              </p>
              <div className="mt-3">
                <h4 className="text-md font-semibold text-gray-800">
                  Ukuran Kendaraan yang Diperbolehkan:{" "}
                </h4>
                <div className="flex space-x-3 mt-1">
                  {loc.vehicleSizes.includes("small") && (
                    <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Kecil
                    </span>
                  )}
                  {loc.vehicleSizes.includes("medium") && (
                    <span className="bg-yellow-200 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Sedang
                    </span>
                  )}
                  {loc.vehicleSizes.includes("large") && (
                    <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Besar
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <h4 className="text-md font-semibold text-gray-800">
                  Harga Per Hari:
                </h4>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {loc.pricePerDay.small > 0 && (
                    <li>Kecil: Rp {loc.pricePerDay.small.toLocaleString()}</li>
                  )}
                  {loc.pricePerDay.medium > 0 && (
                    <li>
                      Sedang: Rp {loc.pricePerDay.medium.toLocaleString()}
                    </li>
                  )}
                  {loc.pricePerDay.large > 0 && (
                    <li>Besar: Rp {loc.pricePerDay.large.toLocaleString()}</li>
                  )}
                </ul>
              </div>

              <button
                onClick={() => handleViewDetails(loc)}
                className="mt-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Lihat Detail
              </button>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default OpenStreetMapWithLocations;
