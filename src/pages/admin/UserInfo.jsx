import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userLogo from "../../assets/userLogo.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useDispatch} from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const UserInfo = () => {
  const navigate = useNavigate();
  // const { user } = useSelector((store) => store.user);
  const params = useParams();
  const [updateUser, setUpdateUser] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = params.id;
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    }); //preview only
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        formData.append("file", file); // image file for backend multer
      }

      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/user/get-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        setUpdateUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="pt-5 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
          <div className="flex justify-between gap-10">
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
            <h1 className=" font-bold mb-7 text-2xl text-gray-800">
              Update Profile
            </h1>
          </div>
          <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
            {/* profile picture */}
            <div className="flex flex-col items-center">
              <img
                src={updateUser?.profilePic ? updateUser.profilePic : userLogo}
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
            {/* profile form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 shadow-lg p-5 rounded-lg bg-white w-[400px]"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={updateUser?.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  ></Input>
                </div>
                <div>
                  <Label className="block text-sm font-medium">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={updateUser?.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  ></Input>
                </div>
              </div>
              <div>
                <Label className="block text-sm font-medium">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={updateUser?.email}
                  onChange={handleChange}
                  placeholder="xyz@gmail.com"
                  className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-none-allowed"
                  disabled
                ></Input>
              </div>
              <div>
                <Label className="block text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  type="text"
                  name="phoneNo"
                  value={updateUser?.phoneNo}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  placeholder="Enter your contact No"
                ></Input>
              </div>
              <div>
                <Label className="block text-sm font-medium">Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={updateUser?.address}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  placeholder="Enter your Address"
                ></Input>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium">City</Label>
                  <Input
                    type="text"
                    name="city"
                    value={updateUser?.city}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="Enter your city"
                  ></Input>
                </div>
                <div>
                  <Label className="block text-sm font-medium">Zip Code</Label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={updateUser?.zipCode}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="Enter your zipcode"
                  ></Input>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label className="text-sm font-medium whitespace-nowrap">
                  Role:
                </Label>
                <RadioGroup
                  value={updateUser?.role}
                  onValueChange={(value) =>
                    setUpdateUser({ ...setUpdateUser, role: value })
                  }
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user" className="cursor-pointer">
                      User
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin" className="cursor-pointer">
                      Admin
                    </Label>
                  </div>
                </RadioGroup>
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
      </div>
    </div>
  );
};

export default UserInfo;
