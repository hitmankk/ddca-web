import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import EditStudentModal from "../../components/EditStudentModal";
import AttendanceModal from "../../components/AttendanceModal";
import "./adminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminStudentPanel = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    playingRole: "",
    skillLevel: "",
    personalTrainerAssigned: false,
  });

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentData, setPaymentData] = useState({ amount: "", month });

  const fetchStudents = async () => {
    const { data } = await axios.get(
      `/api/v1/admin/students?keyword=${search}&filter=${filter}&month=${month}`
    );
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, [search, filter, month]);

  const handleAddStudent = async () => {
    await axios.post("/api/v1/register", form);
    setAddModalOpen(false);
    fetchStudents();
  };

  const handleUpdatePayment = async () => {
    await axios.patch(
      `/api/v1/admin/students/${selectedStudent._id}/payment`,
      paymentData
    );
    setPaymentModal(false);
    fetchStudents();
  };

  return (
    <div className="admin-dashboard p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <button
          onClick={() =>
            // setAddModalOpen(true)
            navigate("/admission")
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Student
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name"
          className="border p-2 rounded w-1/3"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="pt-assigned">PT Assigned</option>
        </select>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <h1>{month}</h1>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subscription</th>
            <th>Trainer</th>
            <th>Attendance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr key={stu._id} className="text-center border-t">
              <td className="p-2">{stu.name}</td>
              <td>{stu.email}</td>
              <td>{stu.phone}</td>
              <td>
                {stu.subscription?.isMonthlyPaid ? (
                  <span className="text-green-600">Paid</span>
                ) : (
                  <span className="text-red-600">Unpaid</span>
                )}
              </td>
              <td>{stu.personalTrainerAssigned ? "Yes" : "No"}</td>
              <td>{stu.attendance?.length || 0}</td>
              <td className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    setSelectedStudent(stu);
                    setPaymentModal(true);
                  }}
                  className="text-purple-600 hover:underline"
                >
                  Update Payment
                </button>
                <button
                  onClick={() => {
                    setSelectedStudent(stu);
                    setEditModalOpen(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedStudent(stu);
                    setAttendanceModalOpen(true);
                  }}
                  className="text-green-600 hover:underline"
                >
                  Attendance
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Student Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Add New Student</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                "name",
                "email",
                "phone",
                "age",
                "playingRole",
                "skillLevel",
              ].map((field) => (
                <input
                  key={field}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="border p-2 rounded"
                />
              ))}
              <label className="col-span-2">
                <input
                  type="checkbox"
                  checked={form.personalTrainerAssigned}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      personalTrainerAssigned: e.target.checked,
                    })
                  }
                />{" "}
                Assign PT
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setAddModalOpen(false)}
                className="text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {paymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Update Payment</h2>
            <input
              type="number"
              value={paymentData.amount}
              onChange={(e) =>
                setPaymentData({ ...paymentData, amount: e.target.value })
              }
              placeholder="Amount"
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="month"
              value={paymentData.month}
              onChange={(e) =>
                setPaymentData({ ...paymentData, month: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPaymentModal(false)}
                className="text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePayment}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <EditStudentModal
          student={selectedStudent}
          onClose={() => setEditModalOpen(false)}
          onUpdated={fetchStudents}
        />
      )}

      {/* Attendance Modal */}
      {attendanceModalOpen && (
        <AttendanceModal
          student={selectedStudent}
          onClose={() => setAttendanceModalOpen(false)}
          onUpdated={fetchStudents}
        />
      )}
    </div>
  );
};

export default AdminStudentPanel;
