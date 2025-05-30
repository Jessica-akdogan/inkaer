import { useRef, useState } from 'react'
import axios from 'axios'

type Props = {
  onUploadSuccess: (url: string) => void
}

export default function FileUploader({ onUploadSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState(0)


  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) await upload(file)
  }

  const upload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    setLoading(true)
    setProgress(0)

    try {
      const res = await axios.post(`${import.meta.env.VITE_PORT}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percent)
          }
        }
      })

      setLoading(false)
      onUploadSuccess(res.data.url)
    } catch (err) {
      console.error('Upload failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-4 border-dashed border-gray-400 rounded-2xl p-6 text-center text-gray-600 hover:bg-gray-50 cursor-pointer transition-all duration-300 w-full max-w-xl mx-auto"
      onClick={() => inputRef.current?.click()}
    >
      <input
        type="file"
        accept=".step,.stp,.STEP"
        ref={inputRef}
        hidden
        onChange={(e) => {
          if (e.target.files?.[0]) {
            upload(e.target.files[0])
          }
        }} 
      />
    {loading ? `Uploading and processing file... ${progress}%` : 'Click or drag & drop your STEP file here'}

    </div>
  )
}
