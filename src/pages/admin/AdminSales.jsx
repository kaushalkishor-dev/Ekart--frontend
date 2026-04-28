import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminSales = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    sales: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/orders/sales`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        setStats({
          totalUsers: res.data.totalUsers,
          totalProducts: res.data.totalProducts,
          totalOrders: res.data.totalOrders,
          totalSales: res.data.totalSales,
          sales: res.data.sales || [],
        });
      }
    } catch (error) {
      console.error("Failed to fetch sales data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="pl-[350px] bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading sales data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-100">
      <div className="pl-[300px]">
        <div className="flex flex-col items-center py-20 px-4">
          <div className="w-full max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 text-center">
              Sales Dashboard
            </h1>

            {/* Stats Cards Grid */}
            <div className="grid gap-6 lg:grid-cols-4 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                <CardHeader>
                  <CardTitle>Total Users</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold">
                  {stats.totalUsers.toLocaleString()}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                <CardHeader>
                  <CardTitle>Total Products</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold">
                  {stats.totalProducts.toLocaleString()}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
                <CardHeader>
                  <CardTitle>Paid Orders</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold">
                  {stats.totalOrders.toLocaleString()}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
                <CardHeader>
                  <CardTitle>Total Sales (INR)</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold">
                  ₹{stats.totalSales.toLocaleString("en-IN")}
                </CardContent>
              </Card>
            </div>

            {/* Area Chart – Last 30 Days Sales */}
            {stats.sales && stats.sales.length > 0 && (
              <Card className="shadow-lg lg:col-span-4">
                <CardHeader>
                  <CardTitle>Sales (Last 30 Days)</CardTitle>
                </CardHeader>
                <CardContent style={{ height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[...stats.sales].sort(
                        (a, b) => new Date(a.date) - new Date(b.date),
                      )}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(tick) => {
                          const d = new Date(tick);
                          return `${d.getDate()}/${d.getMonth() + 1}`;
                        }}
                      />
                      <YAxis
                        tickFormatter={(value) =>
                          `₹${(value / 1000).toFixed(0)}k`
                        }
                      />
                      <Tooltip
                        formatter={(value) => [
                          `₹${value.toLocaleString("en-IN")}`,
                          "Sales",
                        ]}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#F472B6"
                        fill="#F472B6"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSales;
