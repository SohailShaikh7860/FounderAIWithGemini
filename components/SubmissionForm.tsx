import React, { useState } from 'react';
import { Upload, FileText, Video, AlertCircle, File as FileIcon, X } from 'lucide-react';
import { StartupSubmission } from '../types';

interface SubmissionFormProps {
  onSubmit: (data: StartupSubmission) => void;
  isProcessing: boolean;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit, isProcessing }) => {
  const [video, setVideo] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [report, setReport] = useState<string>('');
  
  const [dragActiveVideo, setDragActiveVideo] = useState(false);
  const [dragActivePdf, setDragActivePdf] = useState(false);

  // Helper for drag events
  const handleDrag = (e: React.DragEvent, setDrag: (val: boolean) => void) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDrag(true);
    } else if (e.type === "dragleave") {
      setDrag(false);
    }
  };

  // Drop handlers
  const handleDropVideo = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveVideo(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('video/')) {
        alert('Please upload a video file');
        return;
      }
      if (file.size > MAX_VIDEO_SIZE) {
        alert(`Video file is too large. Maximum size is ${MAX_VIDEO_SIZE / (1024 * 1024)}MB`);
        return;
      }
      setVideo(file);
    }
  };

  const handleDropPdf = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActivePdf(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
      }
      if (file.size > MAX_PDF_SIZE) {
        alert(`PDF file is too large. Maximum size is ${MAX_PDF_SIZE / (1024 * 1024)}MB`);
        return;
      }
      setPdfFile(file);
    }
  };

  // File size limits (in bytes)
  const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20MB
  const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

  // File input handlers
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_VIDEO_SIZE) {
        alert(`Video file is too large. Maximum size is ${MAX_VIDEO_SIZE / (1024 * 1024)}MB`);
        e.target.value = '';
        return;
      }
      setVideo(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_PDF_SIZE) {
        alert(`PDF file is too large. Maximum size is ${MAX_PDF_SIZE / (1024 * 1024)}MB`);
        e.target.value = '';
        return;
      }
      setPdfFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate: Needs at least text or PDF
    if (!report.trim() && !pdfFile) return;
    
    onSubmit({ 
      videoFile: video, 
      reportText: report,
      reportFile: pdfFile
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Submit Your Pitch</h2>
        <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">Upload your materials for AI analysis. Video is recommended, plus a Report (PDF) or Summary (Text).</p>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Video Upload Zone */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1 sm:gap-2">
                  <Video className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-xs sm:text-sm">Pitch Video (Optional)</span>
                </span>
                <span className="text-xs text-slate-500">Max: 20MB</span>
              </label>
              <div 
                className={`relative group h-36 sm:h-48 border-2 border-dashed rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 text-center cursor-pointer flex flex-col items-center justify-center
                  ${dragActiveVideo ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/30'}
                  ${video ? 'border-emerald-500/50 bg-emerald-500/5' : ''}
                `}
                onDragEnter={(e) => handleDrag(e, setDragActiveVideo)}
                onDragLeave={(e) => handleDrag(e, setDragActiveVideo)}
                onDragOver={(e) => handleDrag(e, setDragActiveVideo)}
                onDrop={handleDropVideo}
              >
                <input 
                  type="file" 
                  accept="video/*" 
                  onChange={handleVideoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {video ? (
                  <div className="relative w-full">
                    <div className="p-3 bg-emerald-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Video className="w-6 h-6 text-emerald-400" />
                    </div>
                    <p className="text-emerald-400 font-medium truncate px-4">{video.name}</p>
                    <p className="text-slate-500 text-xs mt-1">{(video.size / (1024 * 1024)).toFixed(2)} MB</p>
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); setVideo(null); }}
                      className="absolute -top-16 -right-2 p-1 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white z-10"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="pointer-events-none">
                    <div className="p-2 bg-slate-700 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5 text-slate-300" />
                    </div>
                    <p className="text-slate-300 font-medium text-sm">Upload Video</p>
                    <p className="text-slate-500 text-xs">Drag & drop or click</p>
                  </div>
                )}
              </div>
            </div>

            {/* PDF Upload Zone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileIcon className="w-4 h-4 text-emerald-400" />
                  Report / Deck (PDF)
                </span>
                <span className="text-xs text-slate-500">Max: 10MB</span>
              </label>
              <div 
                className={`relative group h-40 sm:h-48 border-2 border-dashed rounded-xl p-3 sm:p-4 transition-all duration-300 text-center cursor-pointer flex flex-col items-center justify-center
                  ${dragActivePdf ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/30'}
                  ${pdfFile ? 'border-emerald-500/50 bg-emerald-500/5' : ''}
                `}
                onDragEnter={(e) => handleDrag(e, setDragActivePdf)}
                onDragLeave={(e) => handleDrag(e, setDragActivePdf)}
                onDragOver={(e) => handleDrag(e, setDragActivePdf)}
                onDrop={handleDropPdf}
              >
                <input 
                  type="file" 
                  accept="application/pdf" 
                  onChange={handlePdfChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {pdfFile ? (
                  <div className="relative w-full">
                    <div className="p-3 bg-emerald-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <FileText className="w-6 h-6 text-emerald-400" />
                    </div>
                    <p className="text-emerald-400 font-medium truncate px-4">{pdfFile.name}</p>
                    <p className="text-slate-500 text-xs mt-1">{(pdfFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); setPdfFile(null); }}
                      className="absolute -top-16 -right-2 p-1 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white z-10"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="pointer-events-none">
                    <div className="p-2 bg-slate-700 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5 text-slate-300" />
                    </div>
                    <p className="text-slate-300 font-medium text-sm">Upload PDF Report</p>
                    <p className="text-slate-500 text-xs">Drag & drop or click</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Report Text Area (Optional if PDF provided) */}
          <div className="relative">
             <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-[#172033] text-sm text-slate-500">OR / AND</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Executive Summary / Notes
            </label>
            <textarea
              value={report}
              onChange={(e) => setReport(e.target.value)}
              placeholder="Paste your executive summary, financial highlights, or additional notes here..."
              className="w-full h-32 sm:h-40 bg-slate-900/50 border border-slate-700 rounded-xl p-3 sm:p-4 text-sm sm:text-base text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing || (!report && !pdfFile)}
              className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg transition-all transform duration-200
                ${isProcessing || (!report && !pdfFile)
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]'
                }
              `}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing with Gemini...
                </span>
              ) : (
                'Analyze Startup Potential'
              )}
            </button>
            {(!report && !pdfFile) && (
              <p className="text-center text-xs text-red-400/70 mt-3">Please provide at least a PDF Report or a Text Summary to proceed.</p>
            )}
          </div>

          <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-900/30 p-3 rounded-lg border border-slate-800">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              Files are processed in-browser. Maximum file sizes: Videos 20MB, PDFs 10MB.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
