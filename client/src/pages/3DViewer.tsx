import { useState } from 'react'
import FileUploader from '../components/3dViewer/FileUploader';
import StepViewer from '../components/3dViewer/StepViewer';
import  {PdfViewer}  from '../components/pdfViewer/PdfViewer';
import PdfUpload from './../components/pdfViewer/PdfUpload';

function Viewer() {
  const [stepUrl, setStepUrl] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const handleUpload = (url: string) => {
    setPdfUrl(null)
    setTimeout(() => setPdfUrl(url), 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-1 sm:p-6 flex items-center justify-center">
    <div className="flex flex-col overflow-x-auto lg:flex-row gap-8 w-full max-w-7xl">
      {/* STEP VIEWER */}
      <div className="flex-1 flex flex-col bg-white p-2 sm:p-4 rounded-lg shadow-md max-h-[600px]">
        <h1 className="text-2xl font-bold mb-4 text-center">STEP File Viewer</h1>
        <FileUploader onUploadSuccess={setStepUrl} />
        <div className="flex-1 mt-4 overflow-auto lg:overflow-hidden">
          {stepUrl && <StepViewer url={stepUrl} />}
        </div>
      </div>

      {/* PDF VIEWER */}
      <div className="flex-1 flex flex-col bg-white p-2 sm:p-4 rounded-lg shadow-md max-h-[600px]">
        <h1 className="text-2xl font-bold mb-4 text-center">PDF Viewer</h1>
        <PdfUpload onUploadSuccess={handleUpload} />
        <div className="flex-1 mt-4 overflow-auto lg:overflow-hidden">
          {pdfUrl && <PdfViewer url={pdfUrl} />}
        </div>
      </div>
    </div>
  </div> 
  )
}

export default Viewer
