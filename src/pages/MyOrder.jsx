import OrderCard from "@/components/OrderCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const navigate = useNavigate();
  const [userOrder, setUserOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/orders/myorder`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) setUserOrder(res.data.orders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading orders...</div>
      </div>
    );
  }

  if (!userOrder || userOrder.length === 0) {
    return (
      <div className="p-6">
        <Button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft />
        </Button>
        <p className="text-gray-800 text-2xl">No order found for this user</p>
      </div>
    );
  }

  return <OrderCard userOrder={userOrder} />;
};

export default MyOrder;