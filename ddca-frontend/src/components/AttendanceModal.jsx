import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

const AttendanceModal = ({ student, onClose, onUpdated }) => {
  const [allAttendance, setAllAttendance] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student?._id) fetchAttendance();
  }, [student]);

  useEffect(() => {
    // Filter attendance to current month view
    const monthDates = allAttendance
      .map((a) => a.date)
      .filter((d) => dayjs(d).format("YYYY-MM") === month);
    setSelectedDates(monthDates.map((d) => dayjs(d).format("YYYY-MM-DD")));
  }, [allAttendance, month]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/admin/attendance/${student._id}`
      );
      setAllAttendance(data.student.attendance || []);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
      setAllAttendance([]);
    } finally {
      setLoading(false);
    }
  };
  console.log(allAttendance);
  const toggleDate = (date) => {
    const fullDate = dayjs(month).date(date).format("YYYY-MM-DD");
    setSelectedDates((prev) =>
      prev.includes(fullDate)
        ? prev.filter((d) => d !== fullDate)
        : [...prev, fullDate]
    );
  };

  const saveAttendance = async () => {
    try {
      const updatedAttendance = [
        ...allAttendance.filter(
          (d) => dayjs(d.date).format("YYYY-MM") !== month
        ),
        ...selectedDates.map((d) => dayjs(d).toISOString()),
      ];
      await axios.patch(`/api/v1/admin/students/${student._id}/attendance`, {
        attendance: updatedAttendance,
      });
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Failed to save attendance", err);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = dayjs(month).daysInMonth();
    const firstDay = dayjs(month).startOf("month").day();
    const today = dayjs().format("YYYY-MM-DD");
    const dates = [];

    for (let i = 0; i < firstDay; i++) {
      dates.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = dayjs(month).date(d).format("YYYY-MM-DD");
      const isMarked = selectedDates.includes(dateStr);
      const isToday = dateStr === today;

      dates.push(
        <button
          key={dateStr}
          onClick={() => toggleDate(d)}
          className={`w-10 h-10 text-sm flex items-center justify-center rounded cursor-pointer border 
            ${
              isMarked
                ? "bg-green-500 text-white"
                : "bg-white hover:bg-gray-100"
            } 
            ${isToday ? "border-blue-500" : "border-gray-300"}
          `}
        >
          {d}
        </button>
      );
    }

    return <div className="grid grid-cols-7 gap-1">{dates}</div>;
  };

  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Attendance: {student.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-lg"
          >
            &times;
          </button>
        </div>

        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() =>
              setMonth(dayjs(month).subtract(1, "month").format("YYYY-MM"))
            }
            className="text-gray-600 hover:text-black"
          >
            ⬅️
          </button>
          <span className="font-medium">
            {dayjs(month).format("MMMM YYYY")}
          </span>
          <button
            onClick={() =>
              setMonth(dayjs(month).add(1, "month").format("YYYY-MM"))
            }
            className="text-gray-600 hover:text-black"
          >
            ➡️
          </button>
        </div>

        <div className="grid grid-cols-7 text-xs font-medium text-gray-600 mb-1">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 my-4">Loading...</p>
        ) : (
          renderCalendar()
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={saveAttendance}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
