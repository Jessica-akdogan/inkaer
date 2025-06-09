import { useState } from "react";
import "./ImageUploader.scss";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-toastify";

export default function ImageUploader() {
  const { user } = useAuthStore();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image || !user) return toast("No image or user");

    if (image.size > 1 * 1024 * 1024) {
      toast("Image is too large (max 1MB)");
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
      toast("Upload successful!");

    } catch (err) {
      setLoading(false);
      toast("Something went wrong during upload.");
      console.error(err);
    }
  };

  return (
    <div className="uploader">
      <h2>📸 Upload a cute image</h2>
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && <img src={preview} alt="preview" className="preview" />}
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload to the Cloud ☁️"}
      </button>
      {url && (
        <div className="result">
          <p>Image uploaded to:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
      )}
    </div>
  );
}
