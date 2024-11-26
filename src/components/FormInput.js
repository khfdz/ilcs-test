import React from "react";

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  required = true,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded"
        required={required}
      />
    </div>
  );
};

export default FormInput;
