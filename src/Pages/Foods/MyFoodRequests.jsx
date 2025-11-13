import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const MyFoodRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/myFoodRequests?email=${user.email}`)
      .then(res => res.json())
      .then(data => setRequests(data));
  }, [user]);

  const handleStatusChange = (id, newStatus) => {
    fetch(`http://localhost:5000/foodRequests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then(() => {
        setRequests(prev =>
          prev.map(r => (r._id === id ? { ...r, status: newStatus } : r))
        );
      });
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="table w-full">
        <thead>
          <tr>
            <th>User</th>
            <th>Location</th>
            <th>Reason</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req._id}>
              <td className="flex items-center gap-2">
                <img src={req.photoURL} alt="" className="w-10 h-10 rounded-full" />
                {req.name}
              </td>
              <td>{req.location}</td>
              <td>{req.reason}</td>
              <td>{req.contact}</td>
              <td>
                <span
                  className={`badge ${
                    req.status === "pending"
                      ? "badge-warning"
                      : req.status === "accepted"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {req.status}
                </span>
              </td>
              <td>
                {req.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(req._id, "accepted")}
                      className="btn btn-success btn-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(req._id, "rejected")}
                      className="btn btn-error btn-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFoodRequests;
