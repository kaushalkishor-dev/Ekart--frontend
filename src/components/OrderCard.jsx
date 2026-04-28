import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ userOrder }) => {
  const navigate = useNavigate();

  // Guard against missing userOrder (though parent component already handles)
  if (!userOrder || userOrder.length === 0) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button onClick={() => navigate(-1)} variant="outline" size="icon">
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>
        <p className="text-gray-800 text-xl">No orders found.</p>
      </div>
    );
  }

  return (
    <div className=" p-4 md:p-6 max-w-5xl mx-auto mt-[100px] mr-[100px]">
      {/* Header with back button */}
      <div className="flex items-center gap-3 mb-6">
        <Button onClick={() => navigate(-1)} variant="outline" size="icon">
          <ArrowLeft />
        </Button>
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      {/* Orders list */}
      <div className="space-y-8">
        {userOrder.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white"
          >
            {/* Order header - summary */}
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex flex-wrap justify-between items-center gap-2">
              <div>
                <p className="text-sm text-gray-500">ORDER ID</p>
                <p className="font-mono text-sm font-medium">{order._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-lg font-bold">
                  {order.currency} {order.amount?.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* User info */}
            <div className="px-5 py-3 border-b border-gray-100 bg-white">
              <p className="text-sm">
                <span className="font-medium">User:</span>{" "}
                {order.user?.firstName} {order.user?.lastName}
              </p>
              <p className="text-sm text-gray-600">{order.user?.email}</p>
            </div>

            {/* Products list */}
            <div className="px-5 py-4">
              <h3 className="font-semibold text-gray-700 mb-3">Products</h3>
              <ul className="divide-y divide-gray-100">
                {order.products?.map((product, idx) => {
                  const prod = product.productId;
                  const quantity = product.quantity;
                  const price =
                    prod?.productPrice || product.snapshot?.price || 0;
                  const lineTotal = price * quantity;
                  const shortId = prod?._id?.slice(-12) || "N/A";

                  return (
                    <li
                      key={idx}
                      className="py-4 flex flex-col sm:flex-row gap-4"
                    >
                      {/* Product image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          onClick={() =>
                            navigate(
                              `/products/${prod?._id || product.productId}`,
                            )
                          }
                          src={prod?.productImg?.[0]?.url || "/fallback.png"}
                          alt={prod?.productName}
                          className="w-full h-full object-cover cursor-pointer"
                          onError={(e) => (e.target.src = "/fallback.png")}
                        />
                      </div>
                      {/* Product details */}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">
                          {prod?.productName || "Product name unavailable"}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                          {prod?.productDesc || "No description"}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
                          <span className="text-gray-500">ID: {shortId}</span>
                          <span className="font-semibold text-gray-800">
                            {order.currency} {price.toLocaleString()}
                          </span>
                          <span className="text-gray-500">× {quantity}</span>
                          <span className="font-medium text-gray-800">
                            = {order.currency} {lineTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Order totals (optional) */}
              <div className="mt-4 pt-3 border-t border-gray-200 text-right">
                <p className="text-sm text-gray-600">
                  Tax: {order.currency} {order.tax?.toFixed(2)} &nbsp;|&nbsp;
                  Shipping: {order.currency} {order.shipping?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
