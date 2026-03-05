import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

const EditStudentModal = ({ student, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    address: "",
    email: "",
    age: "",
    phone: "",
    skillLevel: "",
    playingRole: "",
    experience: "",
    personalTrainerAssigned: false,
    stats: {
      matchesPlayed: 0,
      runsScored: 0,
      wicketsTaken: 0,
      battingAverage: 0,
      bowlingAverage: 0,
    },
    subscription: {
      active: false,
      isMonthlyPaid: false,
      expiresAt: "",
    },
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        fatherName: student.fatherName || "",
        address: student.address || "",
        email: student.email || "",
        age: student.age || "",
        phone: student.phone || "",
        skillLevel: student.skillLevel || "",
        playingRole: student.playingRole || "",
        experience: student.experience || "",
        personalTrainerAssigned: student.personalTrainerAssigned || false,
        stats: student.stats || {
          matchesPlayed: 0,
          runsScored: 0,
          wicketsTaken: 0,
          battingAverage: 0,
          bowlingAverage: 0,
        },
        subscription: student.subscription || {
          active: false,
          isMonthlyPaid: false,
          expiresAt: "",
        },
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStatsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      stats: { ...prev.stats, [name]: Number(value) },
    }));
  };

  const handleSubscriptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/v1/admin/students/${student._id}`, formData);
      alert("✅ Student updated successfully");
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update student");
    }
  };

  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-3xl overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4 text-center">
          ✏️ Edit Student - {student.name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Details */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "name",
                "fatherName",
                "address",
                "email",
                "phone",
                "skillLevel",
                "playingRole",
                "experience",
              ].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize mb-1">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  name="personalTrainerAssigned"
                  checked={formData.personalTrainerAssigned}
                  onChange={handleChange}
                />
                <label className="text-sm font-medium">
                  Personal Trainer Assigned
                </label>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Player Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(formData.stats).map((stat) => (
                <div key={stat}>
                  <label className="block text-sm font-medium capitalize mb-1">
                    {stat.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="number"
                    name={stat}
                    value={formData.stats[stat]}
                    onChange={handleStatsChange}
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Subscription Section */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Subscription Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.subscription.active}
                  onChange={handleSubscriptionChange}
                />
                <label className="text-sm font-medium">
                  Subscription Active
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isMonthlyPaid"
                  checked={formData.subscription.isMonthlyPaid}
                  onChange={handleSubscriptionChange}
                />
                <label className="text-sm font-medium">Monthly Paid</label>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Subscription Expires At
                </label>
                <input
                  type="date"
                  name="expiresAt"
                  value={
                    formData.subscription.expiresAt
                      ? dayjs(formData.subscription.expiresAt).format(
                          "YYYY-MM-DD"
                        )
                      : ""
                  }
                  onChange={(e) =>
                    handleSubscriptionChange({
                      target: { name: "expiresAt", value: e.target.value },
                    })
                  }
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
