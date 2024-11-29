// BiodataPage.js
import React from "react";
import { useLocation } from "react-router-dom";
import BiodataForm from "../components/BiodataForm";
import BookingSummary from "../components/BookingSummary";

const BiodataPage = () => {
  const location = useLocation();
  const {
    brand,
    type,
    vehicleSize,
    entryDate,
    entryTime,
    exitDate,
    exitTime,
    totalPrice,
    locationName,
    plateNumber,
  } = location.state || {};

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-8">
        <BiodataForm
          brand={brand}
          type={type}
          vehicleSize={vehicleSize}
          entryDate={entryDate}
          entryTime={entryTime}
          exitDate={exitDate}
          exitTime={exitTime}
          totalPrice={totalPrice}
          locationName={locationName}
          plateNumber={plateNumber}
        />
        <BookingSummary
          brand={brand}
          type={type}
          vehicleSize={vehicleSize}
          entryDate={entryDate}
          entryTime={entryTime}
          exitDate={exitDate}
          exitTime={exitTime}
          totalPrice={totalPrice}
          locationName={locationName}
        />
      </div>
    </div>
  );
};

export default BiodataPage;