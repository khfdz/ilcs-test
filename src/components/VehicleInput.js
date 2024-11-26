import React from "react";

const VehicleInput = ({
  brandList,
  brand,
  setBrand,
  type,
  setType,
  vehicleSize,
  setVehicleSize,
  getTypesByBrand,
  getSizeByType,
}) => {
  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setBrand(selectedBrand);
    setType("");
    setVehicleSize("");
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setVehicleSize(getSizeByType(selectedType));
  };

  return (
    <div className="mb-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Pilih Brand Kendaraan
        </label>
        <select
          value={brand}
          onChange={handleBrandChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Pilih Brand Kendaraan</option>
          {brandList.map((brandName) => (
            <option key={brandName} value={brandName}>
              {brandName}
            </option>
          ))}
        </select>
      </div>

      {brand && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Pilih Tipe Kendaraan
          </label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Pilih Tipe Kendaraan</option>
            {getTypesByBrand(brand).map((v) => (
              <option key={v.type} value={v.type}>
                {v.type}
              </option>
            ))}
          </select>
        </div>
      )}

      {type && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Ukuran Kendaraan
          </label>
          <p>
            {vehicleSize === "small"
              ? "Kategori: Kecil"
              : vehicleSize === "medium"
              ? "Kategori: Sedang"
              : vehicleSize === "large"
              ? "Kategori: Besar"
              : "Pilih tipe kendaraan terlebih dahulu"}
          </p>
        </div>
      )}
    </div>
  );
};

export default VehicleInput;
