import { Input } from "@/components/ui/input";
import { Edit, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import axios from "axios";
import { toast } from "sonner";
import { setProducts } from "@/redux/productSlice";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProducts = () => {
  const { products } = useSelector((store) => store.product);
  const [editProduct, setEditProduct] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  let filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice,
    );
  } else if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.productPrice - a.productPrice,
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("productName", editProduct.productName);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("brand", editProduct.brand);
    formData.append("category", editProduct.category);

    //add existing images
    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    // add new file

    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file);
      });

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Product updated successfully");
        const updateProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p,
        );
        dispatch(setProducts(updateProducts));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      dispatch(setProducts(products.filter((p) => p._id !== productId)));
      toast.success("Product deleted");
      await axios.delete(
        `http://localhost:8000/api/v1/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="pl-[350px] py-30 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="flex justify-between">
        <div className="relative bg-white rounded-lg">
          <Input
            type="text"
            values={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Product..."
            className="w-[400px]"
          />
          <Search className="absolute right-3 top-2 text-gray-500" />
        </div>

        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="highToLow">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Products List */}
      {filteredProducts.map((product) => (
        <Card key={product._id} className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left */}
            <div className="flex gap-3 items-center">
              <img
                src={product?.productImg?.[0]?.url}
                alt="product"
                className="w-24 h-24 object-cover rounded"
              />
              <h1 className="w-80 font-bold text-gray-700">
                {product.productName}
              </h1>
            </div>

            {/* Price */}
            <h1 className="font-semibold text-gray-800">
              ₹ {product.productPrice}
            </h1>

            {/* Actions */}
            <div className="flex gap-3">
              {/* Edit Dialog */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Edit
                    onClick={() => {
                      (setOpen(true), setEditProduct(product));
                    }}
                    variant="outline"
                    className="text-green-500 cursor-pointer"
                  >
                    Edit
                  </Edit>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[625px] max-h-[750px] overflow-y-scroll">
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                      Update product details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-2">
                    <div className="grid gap-2">
                      <Label>Product Name</Label>
                      <Input
                        type="text"
                        value={editProduct?.productName}
                        onChange={handleChange}
                        name="productName"
                        placeholder="EX-Iphone"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Price</Label>
                      <Input
                        type="number"
                        value={editProduct?.productPrice}
                        onChange={handleChange}
                        name="productPrice"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Brand</Label>
                      <Input
                        type="text"
                        value={editProduct?.brand}
                        onChange={handleChange}
                        name="brand"
                        placeholder="Ex-Apple"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Category</Label>
                      <Input
                        type="text"
                        value={editProduct?.category}
                        onChange={handleChange}
                        name="category"
                        placeholder="Ex-Mobile/Laptop/...."
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label>Description</Label>
                      </div>
                      <Textarea
                        name="productDesc"
                        value={editProduct?.productDesc}
                        onChange={handleChange}
                        placeholder="Enter brief description of product"
                      />
                    </div>
                    <ImageUpload
                      productData={editProduct}
                      setProductData={setEditProduct}
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSave} type="submit">
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Trash2 className="text-red-500 cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your product from our dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdminProducts;
