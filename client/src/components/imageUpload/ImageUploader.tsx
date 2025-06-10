
import {  useState, lazy, Suspense } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner";
import "./ImageUploader.scss";

// Lazy load the user image gallery for code splitting
const UserImageGallery = lazy(() => import("./UserImageGallery"));



export default function ImageUploader() {
  const { user } = useAuthStore();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0); // to trigger refetch in gallery

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!user) {
      toast("You must be logged in to upload images.");
      return;
    }

    if (!image) {
      toast("No image selected.");
      return;
    }

    if (image.size > 5 * 1024 * 1024) {
      toast("Image is too large (max 5MB)");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const token = await user.getIdToken();

      const res = await fetch(`${import.meta.env.VITE_PORT}/image-upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        toast(data.message || "Upload failed");
        return;
      }

      setUrl(data.imageUrl);
      setImage(null);
      setPreview("");
      toast("Upload successful!");
      setRefresh(prev => prev + 1); // trigger gallery refresh
    } catch (err) {
      setLoading(false);
      toast("Something went wrong during upload.");
      console.error(err);
    }
  };

  return (
    <div className="uploader">
      <h2>📸 Upload a cute image</h2>


        {loading && <Spinner />}

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={loading}
        />
        {preview && <img src={preview} alt="preview" className="preview" />}
        <button onClick={handleUpload} disabled={loading || !user}>
          {loading ? "Uploading..." : "Upload to the Cloud ☁️"}
        </button>

        {url && (
          <div className="result">
            <p className="text-gray-900 font-medium">Image uploaded to:</p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </div>
        )}

        <Suspense fallback={<Spinner />}>
          <UserImageGallery refreshTrigger={refresh} />
        </Suspense>

    </div>
  );
}
