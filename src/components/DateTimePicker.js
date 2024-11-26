import React from "react";
import DatePicker from "react-datepicker";

const DateTimePicker = ({ label, selectedDate, onChange, type }) => {
  const handleTimeChange = (e) => {
    const timeValue = e.target.value;
    onChange(timeValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === "date" ? (
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          dateFormat="yyyy/MM/dd"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      ) : (
        <input
          type="time"
          value={selectedDate || ""}
          onChange={handleTimeChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      )}
    </div>
  );
};

export default DateTimePicker;
