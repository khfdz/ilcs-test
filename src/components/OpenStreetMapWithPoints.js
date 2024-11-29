import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { useSearch } from "../context/SearchContext";
import dataPlace from "../data/DataPlace.json";
import Pin1 from "../icons/location-pin.png";
import Pin2 from "../icons/location-pin2.png";

const OpenStreetMapWithLocations = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const { searchQuery, updateSearchQuery, filteredLocations, setFilteredLocations } = useSearch();

  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [selectedCenter, setSelectedCenter] = useState([-6.217419255905705, 106.8064718258548]); // Default center
  const [vehicleSizeFilter, setVehicleSizeFilter] = useState("all"); // State untuk filter ukuran kendaraan

  useEffect(() => {
    if (searchQuery) {
      const filtered = dataPlace.filter((loc) =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRecommendations(filtered);
      setFilteredLocations(filtered);
    } else {
      setRecommendations(dataPlace);
      setFilteredLocations(dataPlace);
    }
  }, [searchQuery, setFilteredLocations]);

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

  const handleSearchChange = (event) => {
    updateSearchQuery(event.target.value);
    setShowRecommendations(true);
  };

  const handleRecommendationClick = (location) => {
    updateSearchQuery(location.name);
    setFilteredLocations([location]); // Filter hanya untuk lokasi terpilih
    setShowRecommendations(false);
    setSelectedCenter(location.position); // Update center ke lokasi yang dipilih
  };

  const handleClearSearch = () => {
    updateSearchQuery("");
    setShowRecommendations(true);
  };

  const handleVehicleSizeChange = (event) => {
    setVehicleSizeFilter(event.target.value);
  };

  // Filter lokasi berdasarkan ukuran kendaraan
  const filteredByVehicleSize = filteredLocations.filter((loc) =>
    vehicleSizeFilter === "all" || loc.vehicleSizes.includes(vehicleSizeFilter)
  );

  return (
    <div className="flex justify-center items-center h-full mb-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-small mb-4 mt-12 text-center font-poppins text-blue1">
          Lokasi Parkir Kendaraan Yang Tersedia
        </h1>

        <div className="mb-4 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-x-4 md:space-y-0">
          {/* Input Search */}
          <div className="relative w-full md:w-[60%]">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Cari lokasi parkir..."
              className="text-sm w-full p-2 border border-gray-300 rounded"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute rounded-sm text-xs bg-red-500 px-1 right-2 top-1/2 transform -translate-y-1/2 text-white"
              >
                X
              </button>
            )}
          </div>

          {/* Dropdown Filter */}
          <div className="w-full md:w-[30%]">
            <select
              value={vehicleSizeFilter}
              onChange={handleVehicleSizeChange}
              className="text-sm p-2 border border-gray-300 rounded w-full"
            >
              <option value="all">Semua Ukuran</option>
              <option value="small">Kecil</option>
              <option value="medium">Sedang</option>
              <option value="large">Besar</option>
            </select>
          </div>
        </div>

        {searchQuery && showRecommendations && recommendations.length > 0 && (
          <div className="absolute bg-gray-100 right-[5%] -left-6 z-40 text-xs mb-4 w-[20%] -mt-4 h-[30%] max-h-[300px] text-left overflow-y-auto border rounded-md shadow-md mx-auto">
            {recommendations.map((loc) => (
              <div
                key={loc.id}
                onClick={() => handleRecommendationClick(loc)}
                className="cursor-pointer hover:bg-gray-200 p-2"
              >
                <p className="font-semibold">{loc.name}</p>
                <p className="text-sm text-gray-500">{loc.address}</p>
              </div>
            ))}
          </div>
        )}

        <div className="relative z-0">
          <MapContainer
            center={selectedCenter} 
            key={selectedCenter.join(",")}
            zoom={16}
            style={{ height: "350px", width: "100%" }}
            whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredByVehicleSize.map((loc) => {
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
                  <Popup className="popup-content font-poppins">
                    <h3 className="text-xl font-semibold text-blue1 font-poppins text-center">{loc.name}</h3>
                    <p className="text-sm text-gray-700">
                      Total Kendaraan Parkir: {totalParked}/{loc.capacity}
                    </p>
                    <p className={` text-sm ${isAvailable ? "text-green-500" : "text-red-500"}`}>
                      Status: {isAvailable ? "Tersedia" : "Penuh"}
                    </p>
                    <div className="mt-2">
                      <h4 className="text-md text-gray-800">Ukuran Kendaraan yang Diperbolehkan:</h4>
                      <div className="flex space-x-3 mt-1">
                        {loc.vehicleSizes.includes("small") && (
                          <span className="bg-green-200 text-green-700 px-3 py-1 rounded-md text-xs font-semibold">
                            Kecil
                          </span>
                        )}
                        {loc.vehicleSizes.includes("medium") && (
                          <span className="bg-yellow-200 text-yellow-700 px-3 py-1 rounded-md text-xs font-semibold">
                            Sedang
                          </span>
                        )}
                        {loc.vehicleSizes.includes("large") && (
                          <span className="bg-red-200 text-red-700 px-3 py-1 rounded-md text-xs font-semibold">
                            Besar
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => handleViewDetails(loc)}
                        className="bg-yellow2 text-black text-xs py-2 px-6 rounded-md"
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default OpenStreetMapWithLocations;
