import axios from "axios";
import { API_BASE_URL } from "../config";

// Type definitions
export interface Album {
  _id: string;
  name: string;
  createdAt: string;
  // Add more fields as needed
}

export interface Image {
  _id: string;
  pictureURL: string;
  uploadedBy: string;
  createdAt: string;
  // Add more fields as needed
}

// Fetch all albums for a workspace
export const fetchAlbums = async (workspaceName: string): Promise<Album[]> => {
  const res = await axios.get(`${API_BASE_URL}/album/getalbums/${workspaceName}`);
  return res.data;
};

// Fetch all images for an album
export const fetchImages = async (albumName: string): Promise<Image[]> => {
  const res = await axios.get(`${API_BASE_URL}/image/getimages/${albumName}`);
  return res.data;
};

// Upload an image to your backend (after getting Cloudinary URL)
export const uploadImageToBackend = async ({
  albumName,
  pictureURL,
  uploadedBy,
}: {
  albumName: string;
  pictureURL: string;
  uploadedBy: string;
}) => {
  const res = await axios.post(`${API_BASE_URL}/image/uploadimage`, {
    albumName,
    pictureURL,
    uploadedBy,
  });
  return res.data;
};