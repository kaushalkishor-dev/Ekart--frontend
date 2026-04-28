import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/orders/all",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("❌ Failed to fetch admin orders:", err);
        setError(err.response?.data?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="pl-[350px] py-20 pr-20 flex justify-center">
        <div className="text-gray-600">Loading all orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pl-[350px] py-20 pr-20">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="pl-[350px] py-20 pr-20">
      <h1 className="text-3xl font-bold mb-6">All Orders (Admin)</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Products</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-sm font-mono">
                    {order._id}
                  </td>
                  <td className="px-4 py-2 border">
                    {order.user?.firstName} {order.user?.lastName}
                    <br />
                    <span className="text-xs text-gray-500">
                      {order.user?.email}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {order.products?.map((p, idx) => (
                      <div key={idx} className="text-sm">
                        {p.productId?.productName || "Deleted product"} × {p.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-2 border font-semibold">
                    {order.currency} {order.amount?.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}
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

export default AdminOrders;