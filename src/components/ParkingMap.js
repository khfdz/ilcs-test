import React from "react";
import { MapContainer, TileLayer, Marker} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Pin1 from "../icons/location-pin.png"; 
import Pin2 from "../icons/location-pin2.png";
const ParkingMap = ({ location }) => {
  if (!location) return null;

  const calculateParkedVehicles = (parkedVehicles) => {
    return parkedVehicles.small + parkedVehicles.medium + parkedVehicles.large;
  };

  const isAvailable = (location) => {
    const totalParked = calculateParkedVehicles(location.parkedVehicles);
    return totalParked < location.capacity;
  };

  const customIcon = new L.Icon({
    iconUrl: isAvailable(location) ? Pin2 : Pin1,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <MapContainer
      center={location.position}
      zoom={18}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={location.position} icon={customIcon}>

      </Marker>
    </MapContainer>
  );
};

export default ParkingMap;
