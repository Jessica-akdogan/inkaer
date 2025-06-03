
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import React, { useEffect, useRef, useState } from 'react'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PdfViewerProps {
  url: string
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [containerWidth, setContainerWidth] = useState<number>(window.innerWidth)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  // Measure container width
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-xl overflow-auto shadow-2xl border bg-gray-100"
    >
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <div className="flex flex-col items-center gap-8 p-2">
          {Array.from({ length: numPages }, (_, index) => (
            <div
              key={index}
              className="bg-white shadow border p-2 flex items-center justify-center"
            >
              <Page
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={Math.min(containerWidth - 40, 800)} // cap width to prevent oversize
              />
            </div>
          ))}
        </div>
      </Document>
    </div>
  )
}