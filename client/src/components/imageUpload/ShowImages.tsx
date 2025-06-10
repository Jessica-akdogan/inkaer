
type Props = {
  images: string[];
  refreshImages: () => void;
};

export default function ShowImages({ images, refreshImages }: Props) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">🖼️ Your Uploaded Images</h2>
      <button
        onClick={refreshImages}
        className="mb-2 text-sm text-blue-600 underline"
      >
        🔄 Refresh
      </button>

      {images.length > 0 ? (
        <div className="gallery grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Uploaded ${idx}`}
              className="w-full rounded shadow"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ))}
        </div>
      ) : (
        <p>No images uploaded yet.</p>
      )}
    </div>
  );
}
