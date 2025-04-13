import { useState } from "react";

export default function TruckForm() {
  const [formData, setFormData] = useState({
    truckNo: "",
    driverId: "",
    startLoc: "",
    endLoc: "",
    startDate: "",
    endDate: "",
    totalCapacity: "",
    availableCapacity: "",
    status: "",
    assignedIncharge: "",
    createdBy: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    for (const field in formData) {
      if (!formData[field]) {
        tempErrors[field] = `This value is required`;
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted", formData);
      setFormData({
        truckNo: "",
        driverId: "",
        startLoc: "",
        endLoc: "",
        startDate: "",
        endDate: "",
        totalCapacity: "",
        availableCapacity: "",
        status: "",
        assignedIncharge: "",
        createdBy: ""
      });
      setErrors({});
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Truck Details Form</h2>
      <form onSubmit={handleSubmit} className="grid ">
        {Object.keys(formData).map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium">
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
