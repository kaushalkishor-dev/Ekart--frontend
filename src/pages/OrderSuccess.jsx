import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-green-600 text-2xl">
            🎉 Order Placed Successfully
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Thank you for your purchase! Your payment was successful and your order has been confirmed.
          </p>

          <div className="text-sm text-gray-500">
            You will receive an email confirmation shortly.
          </div>

          <div className="pt-4 space-y-2">
            <Button
              onClick={() => navigate("/orders")}
              className="w-full"
            >
              View My Orders
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;