import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const MyFoodRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/myFoodRequests?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const handleStatusChange = (id, action) => {
    const newStatus = action === "accept" ? "donated" : "rejected";

    fetch(`http://localhost:3000/food-requests/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req
          )
        );
      })
      .catch((err) => console.error("Update failed:", err));
  };

  // স্ট্যাটাস অনুযায়ী ব্যাজ + রঙ
  const getStatusBadge = (status) => {
    if (status === "pending") return "badge badge-warning";
    if (status === "donated") return "badge badge-success";   // এখানে সবুজ হবে
    if (status === "rejected") return "badge badge-error";
    return "badge badge-ghost";
  };

  const getStatusText = (status) => {
    if (status === "donated") return "Donated";
    if (status === "rejected") return "Rejected";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return <div className="text-center py-10">Loading requests...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Food Requests</h2>

      {requests.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-xl">No requests found yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table w-full table-zebra">
            <thead className="bg-base-200">
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
              {requests.map((req) => (
                <tr key={req._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={req.photoURL || "https://i.ibb.co.com/0j1V6Tc/default-avatar.png"}
                            alt={req.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{req.name}</div>
                        <div className="text-sm opacity-70">{req.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{req.location || "—"}</td>
                  <td className="max-w-xs">{req.reason || "—"}</td>
                  <td>{req.contact || "—"}</td>

                  {/* Status Badge – এখানে Donated হলে সবুজ দেখাবে */}
                  <td>
                    <span className={getStatusBadge(req.status)}>
                      {getStatusText(req.status)}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td>
                    {req.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(req._id, "accept")}
                          className="btn btn-success btn-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(req._id, "reject")}
                          className="btn btn-error btn-sm"
                        >
                          Reject
                        </button>
                      </div>
                    ) : req.status === "donated" ? (
                      <span className="text-success font-bold">Donated</span>
                    ) : (
                      <span className="text-error font-bold">Rejected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoodRequests;