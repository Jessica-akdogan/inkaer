import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore";

interface ImageItem {
  id?: string;
  url: string;
}

export default function UserImageGallery({
  refreshTrigger = 0,
}: {
  refreshTrigger?: number;
}) {
  const { user } = useAuthStore();
  const [userImages, setUserImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserImages = async () => {
    if (!user) return;

    setLoading(true); // Start loading

    try {
      const token = await user.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_PORT}/api/user-images`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await res.text();

      const data = JSON.parse(text);

      if (res.ok) {
        setUserImages(data.images);
      } else {
        toast(data.message || "Failed to fetch images");
      }
    } catch (err) {
      toast("Error fetching images");
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchUserImages();
  }, [user, refreshTrigger]);

  return (
    <div className="user-images mt-4">
      <h3 className="font-semibold">Your Uploaded Images:</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {!loading && userImages.length === 0 ? (
          <p>No images found</p>
        ) : (
          userImages.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={`Uploaded ${i}`}
              className="rounded shadow"
              onError={() => console.log("Failed to load:", img.url)}
            />
          ))
        )}
      </div>
    </div>
  );
}
