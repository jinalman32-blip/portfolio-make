import React, { useState, useRef } from 'react'
import { X, Upload, FileText, CheckCircle, Loader } from 'lucide-react'

export default function UploadModal({ onClose }) {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef()

  const handleFile = (f) => {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
    if (!allowed.includes(f.type)) {
      setError('Only PDF and DOCX files are allowed')
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB')
      return
    }
    setFile(f)
    setError('')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setError('')
    // Simulate upload
    await new Promise(r => setTimeout(r, 1800))
    setUploading(false)
    setSuccess(true)
    setTimeout(() => onClose(), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, #0d1526, #0a0f1e)',
          border: '1px solid rgba(34, 211, 238, 0.2)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(34, 211, 238, 0.05)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={20} />
        </button>

        <h2 className="text-white text-xl font-bold mb-1">Upload Resume</h2>
        <p className="text-gray-400 text-sm mb-6">Upload your PDF or DOCX file to generate your portfolio</p>

        {success ? (
          <div className="flex flex-col items-center py-10 gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <p className="text-green-400 font-semibold">Resume uploaded successfully!</p>
            <p className="text-gray-400 text-sm">Generating your portfolio...</p>
          </div>
        ) : (
          <>
            {/* Drop Zone */}
            <div
              className="relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer mb-5"
              style={{
                borderColor: dragging ? 'rgba(34, 211, 238, 0.6)' : file ? 'rgba(34, 211, 238, 0.4)' : 'rgba(75, 85, 99, 0.5)',
                background: dragging ? 'rgba(34, 211, 238, 0.05)' : 'rgba(13, 21, 38, 0.4)'
              }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
              />
              <div className="flex flex-col items-center py-10 px-6 text-center">
                {file ? (
                  <>
                    <FileText size={40} className="text-cyan-400 mb-3" />
                    <p className="text-white font-medium">{file.name}</p>
                    <p className="text-gray-400 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                  </>
                ) : (
                  <>
                    <Upload size={40} className="text-gray-500 mb-3" />
                    <p className="text-white font-medium">Drop your resume here</p>
                    <p className="text-gray-400 text-sm mt-1">or click to browse</p>
                    <p className="text-gray-600 text-xs mt-3">PDF, DOC, DOCX • Max 5MB</p>
                  </>
                )}
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-4 px-1">{error}</p>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all duration-300"
              style={{
                background: file && !uploading
                  ? 'linear-gradient(135deg, #22d3ee, #0ea5e9)'
                  : 'rgba(75, 85, 99, 0.3)',
                cursor: file && !uploading ? 'pointer' : 'not-allowed',
                boxShadow: file && !uploading ? '0 4px 20px rgba(34, 211, 238, 0.3)' : 'none'
              }}
            >
              {uploading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Upload & Generate Portfolio
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
