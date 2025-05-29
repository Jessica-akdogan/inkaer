export function Loader({ progress }: { progress: number }) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-10">
        <div className="text-center text-white">
          <div className="w-20 h-20 border-4 border-t-blue-500 border-white rounded-full animate-spin mx-auto mb-4" />
          <div className="text-xl font-semibold">Loading... {progress}%</div>
        </div>
      </div>
    )
  }