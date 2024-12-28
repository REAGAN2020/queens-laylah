import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface ImageUploadProps {
  value: string[]; // Array of uploaded image URLs
  onChange: (value: string) => void; // Callback for adding an image URL
  onRemove: (value: string) => void; // Callback for removing an image URL
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    if (result?.info?.secure_url) {
      onChange(result.info.secure_url);
    } else {
      console.error("Upload failed:", result);
    }
  };

  return (
    <div>
      {/* Display uploaded images */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            {/* Remove button */}
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-500 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            {/* Uploaded image */}
            <Image
              src={url}
              alt="Uploaded image"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>

      {/* Upload button */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"}
        onUpload={onUpload}
      >
        {({ open }) => (
          <Button
            type="button"
            onClick={() => open()}
            className="bg-gray-500 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
