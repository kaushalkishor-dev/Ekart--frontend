import React, { useState } from "react";
import userLogo from "../assets/userLogo.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import MyOrder from "./MyOrder";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const userId = params.userId;
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNo: user?.phoneNo || "",
    address: user?.address || "",
    city: user?.city || "",
    zipCode: user?.zipCode || "",
    profilePic: user?.profilePic || "",
    role: user?.role || "",
  });

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const accessToken = localStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("address", updateUser.address);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" md:p-8 min-h-screen bg-gray-100">
      <Tabs defaultValue="profile" className="w-full max-w-7xl mx-auto p-30">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="flex flex-col items-center justify-center bg-gray-100">
            <h1 className="font-bold mb-7 text-2xl text-gray-800">
              Update Profile
            </h1>
            <div className="w-full flex flex-col md:flex-row gap-10 justify-between items-start px-4 max-w-2xl">
              {/* Profile picture section */}
              <div className="flex flex-col items-center">
                <img
                  src={updateUser?.profilePic || userLogo}
                  alt="profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-pink-800"
                />
                <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-800">
                  Change Picture
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>
              {/* Profile form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 shadow-lg p-5 rounded-lg bg-white w-full md:w-[400px]"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={updateUser.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={updateUser.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="block text-sm font-medium">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={updateUser.email}
                    onChange={handleChange}
                    placeholder="xyz@gmail.com"
                    className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
                    disabled
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    type="text"
                    name="phoneNo"
                    value={updateUser.phoneNo}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="Enter your contact No"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    value={updateUser.address}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="Enter your Address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium">City</Label>
                    <Input
                      type="text"
                      name="city"
                      value={updateUser.city}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium">Zip Code</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={updateUser.zipCode}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="Enter your zipcode"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-pink-600 hover:bg-pink-800 text-white font-semibold py-2 rounded-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="orders">
          <MyOrder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;