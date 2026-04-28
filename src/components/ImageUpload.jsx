import { Label } from "@/components/ui/label";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardAction, CardContent } from "./ui/card";
import { X } from "lucide-react";

const ImageUpload = ({ productData, setProductData }) => {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setProductData((prev) => ({
        ...prev,
        productImg: [...prev.productImg, ...files],
      }));
    }
  };

  const removeImage = (index) => {
    setProductData((prev) => {
      const uploadImages = prev.productImg.filter((_, i) => i !== index);
      return {...prev, productImg:uploadImages}
    });
  };

  return (
    <div className="grid gap-2">
      <Label>Product Images</Label>
      <Input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFiles}
      />
      <Button variant="outline" className="cursor-pointer">
        <label htmlFor="file-upload">Upload Images</label>
      </Button>

      {/* image Preview */}
      {productData.productImg.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-3 sm:grid-cols-3">
          {productData.productImg.map((file, idx) => {
            let preview;

            if (file instanceof File) {
              preview = URL.createObjectURL(file);
            } else if (typeof file === "string") {
              preview = file;
            } else {
              return null;
            }

            return (
              <Card key={idx} className="relative group overflow-hidden">
                <CardContent>
                  <img
                    src={preview}
                    alt="preview"
                    height={200}
                    width={200}
                    className="w-full h-32 object-cover rounded-md border"
                  />
                  {/* remove button */}
                  <button
                    className="absolute top-1 rigth-1 bg-black/50 text-white p-1 rounded-full
                    opacity-0 group-hover:opacity-100 transition"
                    onClick={()=>removeImage(idx)}
                  >
                    <X size={14} />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
