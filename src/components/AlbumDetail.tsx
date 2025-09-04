import React, { useEffect, useState } from "react";
import { fetchImages, Image as ImageType } from "../api/album";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/router";

const AlbumDetail: React.FC = () => {
  const router = useRouter();
  const { albumName } = router.query as { albumName?: string };
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    if (albumName) {
      fetchImages(albumName).then(setImages);
    }
  }, [albumName]);

  if (!albumName) return <div>Loading...</div>;

  return (
    <div>
      <h2>Album: {albumName}</h2>
      <ImageUpload albumName={albumName} onUpload={() => fetchImages(albumName).then(setImages)} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.length === 0 && <p>No images yet.</p>}
        {images.map((img) => (
          <div key={img._id}>
            <img
              src={img.pictureURL}
              alt="album"
              style={{ width: 150, height: 150, objectFit: "cover" }}
            />
            <div>By: {img.uploadedBy}</div>
            <div>{new Date(img.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumDetail;