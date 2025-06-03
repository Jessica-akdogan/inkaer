
import React, { useRef, useState } from 'react'

interface PdfUploadProps {
  onUploadSuccess: (url: string) => void
}

const PdfUpload: React.FC<PdfUploadProps> = ({ onUploadSuccess }) => {
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`${import.meta.env.VITE_PORT}/upload`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      onUploadSuccess(data.url)
    } catch (error) {
      console.error('Upload failed', error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadFile(file)
      e.target.value = '' // Clear input to allow same file re-upload
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      uploadFile(file)
    }
  }

  return (
    <div
      className={`border-4 border-dashed border-gray-400 rounded-2xl p-1 sm:p-6 text-center text-gray-600 hover:bg-gray-50 cursor-pointer transition-all duration-300 w-full max-w-xl mx-auto  ${
        dragOver ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
      }`}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <p className="text-gray-600">Drag & drop a PDF here, or click to select a file</p>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default PdfUpload
