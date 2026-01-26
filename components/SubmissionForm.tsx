import React, { useState } from 'react';
import { Upload, FileText, Video, AlertCircle, File as FileIcon, X, ArrowRight } from 'lucide-react';
import { StartupSubmission } from '../types';
import { Card } from './ui/Card';

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

  // File size limits (in bytes)
  const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20MB
  const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

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
    if (!report.trim() && !pdfFile) return;

    onSubmit({
      videoFile: video,
      reportText: report,
      reportFile: pdfFile
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto animate-fade-in-up" padding="lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">New Analysis Request</h2>
        <p className="text-slate-400">Provide your pitch materials. Our AI agents will simulate a full VC due diligence process.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video Upload Zone */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-400" />
                Pitch Video (Optional)
              </span>
              <span className="text-xs text-slate-500">Max: 20MB</span>
            </label>
            <div
              className={`relative group h-48 border border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer
                ${dragActiveVideo ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'}
                ${video ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-slate-900/30'}
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
                <div className="text-center w-full px-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Video className="w-6 h-6 text-emerald-400" />
                  </div>
                  <p className="text-emerald-400 font-medium truncate">{video.name}</p>
                  <p className="text-slate-500 text-xs mt-1">{(video.size / (1024 * 1024)).toFixed(2)} MB</p>
                  <button
                    onClick={(e) => { e.preventDefault(); setVideo(null); }}
                    className="mt-3 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto"
                  >
                    <X size={12} /> Remove
                  </button>
                </div>
              ) : (
                <div className="text-center pointer-events-none">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-slate-300 font-medium text-sm">Upload Video</p>
                  <p className="text-slate-500 text-xs mt-1">Drag & drop or browse</p>
                </div>
              )}
            </div>
          </div>

          {/* PDF Upload Zone */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileIcon className="w-4 h-4 text-emerald-400" />
                Pitch Deck (PDF)
              </span>
              <span className="text-xs text-slate-500">Max: 10MB</span>
            </label>
            <div
              className={`relative group h-48 border border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer
                ${dragActivePdf ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'}
                ${pdfFile ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-slate-900/30'}
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
                <div className="text-center w-full px-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-emerald-400" />
                  </div>
                  <p className="text-emerald-400 font-medium truncate">{pdfFile.name}</p>
                  <p className="text-slate-500 text-xs mt-1">{(pdfFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  <button
                    onClick={(e) => { e.preventDefault(); setPdfFile(null); }}
                    className="mt-3 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto"
                  >
                    <X size={12} /> Remove
                  </button>
                </div>
              ) : (
                <div className="text-center pointer-events-none">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-slate-300 font-medium text-sm">Upload Deck</p>
                  <p className="text-slate-500 text-xs mt-1">Drag & drop or browse</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-slate-900/50 backdrop-blur-sm text-xs font-semibold text-slate-500 uppercase tracking-wider">Additional Context</span>
          </div>
        </div>

        {/* Text Area */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Executive Summary / Notes
          </label>
          <textarea
            value={report}
            onChange={(e) => setReport(e.target.value)}
            placeholder="Paste your executive summary, financial highlights, or additional notes here. This helps our AI agents understand your business model better."
            className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500/50 transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isProcessing || (!report && !pdfFile)}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3
              ${isProcessing || (!report && !pdfFile)
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]'
              }
            `}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                Analyzing...
              </span>
            ) : (
              <>
                Analyze Startup Potential <ArrowRight size={20} />
              </>
            )}
          </button>

          {(!report && !pdfFile) && (
            <p className="text-center text-xs text-amber-500/80 mt-3 animate-fade-in">
              Please upload a Pitch Deck or provide an Executive Summary.
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 justify-center text-xs text-slate-500">
          <AlertCircle className="w-3 h-3" />
          <span>Secure, client-side processing. Your data is analyzed by Gemini and not stored permanently.</span>
        </div>
      </form>
    </Card>
  );
};
