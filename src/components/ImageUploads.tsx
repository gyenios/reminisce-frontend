import React, { useState } from "react";
import axios from "axios";
import { CLOUDINARY_API_URL, CLOUDINARY_UPLOAD_PRESET } from "../config";
import { uploadImageToBackend } from "../api/album";

interface ImageUploadProps {
  albumName: string;
  onUpload?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ albumName, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedBy, setUploadedBy] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !uploadedBy) {
      alert("Select a file and enter your name.");
      return;
    }
    setUploading(true);
    try {
      // 1. Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await axios.post(CLOUDINARY_API_URL, formData);
      const pictureURL = res.data.secure_url;

      // 2. Send image URL to your backend
      await uploadImageToBackend({ albumName, pictureURL, uploadedBy });

      setFile(null);
      setUploadedBy("");
      if (onUpload) onUpload();
      alert("Image uploaded!");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
    setUploading(false);
  };

  return (
    <div>
      <h4>Upload an Image</h4>
      <input
        type="text"
        placeholder="Your name"
        value={uploadedBy}
        onChange={e => setUploadedBy(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ImageUpload;