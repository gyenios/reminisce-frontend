import React, { useEffect, useState } from "react";
import { fetchAlbums, Album } from "../../api/album";
import Link from "next/link";
import { useRouter } from "next/router";

const workspaceName = "YOUR_WORKSPACE_NAME"; // replace or get from context

const AlbumList: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchAlbums(workspaceName).then(setAlbums);
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {albums.length === 0 && <p>No albums yet.</p>}
        {albums.map((album) => (
          <Link
            key={album._id}
            href={`/albums/${encodeURIComponent(album.name)}`}
            passHref
          >
            <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16, cursor: "pointer" }}>
              <h3>{album.name}</h3>
              <div>{new Date(album.createdAt).toLocaleDateString()}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;