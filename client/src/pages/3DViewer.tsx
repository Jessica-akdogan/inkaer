import { useState } from 'react'
import FileUploader from '../components/3dViewer/FileUploader';
import StepViewer from '../components/3dViewer/StepViewer';


function Viewer() {
  const [stepUrl, setStepUrl] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">STEP File Viewer</h1>
      <FileUploader onUploadSuccess={setStepUrl} />
      {stepUrl && <StepViewer url={stepUrl} />}
    </div>
  )
}

export default Viewer;
