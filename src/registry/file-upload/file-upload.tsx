"use client";

import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, File, Image as ImageIcon, FileText, Video, Music } from "lucide-react";

interface FileUploadProps {
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: string;
  multiple?: boolean;
}

interface FileWithPreview extends File {
  preview?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return ImageIcon;
  if (type.startsWith("video/")) return Video;
  if (type.startsWith("audio/")) return Music;
  if (type.includes("pdf") || type.includes("document")) return FileText;
  return File;
};

export default function FileUpload({
  onChange,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB default
  accept,
  multiple = true,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string>("");

  const processFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const fileArray = Array.from(files);

      // Validate file count
      if (multiple && selectedFiles.length + fileArray.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        setTimeout(() => setError(""), 3000);
        return;
      }

      // Validate file size
      const oversizedFiles = fileArray.filter((file) => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        setError(`File size must be less than ${formatFileSize(maxSize)}`);
        setTimeout(() => setError(""), 3000);
        return;
      }

      // Create previews for image files
      const filesWithPreviews: FileWithPreview[] = fileArray.map((file) => {
        if (file.type.startsWith("image/")) {
          const preview = URL.createObjectURL(file);
          return Object.assign(file, { preview });
        }
        return file;
      });

      const newFiles = multiple
        ? [...selectedFiles, ...filesWithPreviews]
        : filesWithPreviews;

      setSelectedFiles(newFiles);
      onChange(newFiles);
      setError("");
    },
    [selectedFiles, maxFiles, maxSize, multiple, onChange]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      processFiles(files);
    },
    [processFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files);
    },
    [processFiles]
  );

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = selectedFiles.filter((_, i) => i !== index);

      // Revoke preview URL if it exists
      if (selectedFiles[index].preview) {
        URL.revokeObjectURL(selectedFiles[index].preview!);
      }

      setSelectedFiles(newFiles);
      onChange(newFiles);
    },
    [selectedFiles, onChange]
  );

  // Cleanup preview URLs on unmount
  React.useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [selectedFiles]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Upload Area */}
      <motion.div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        animate={{
          scale: isDragging ? 1.02 : 1,
          borderColor: isDragging
            ? "rgb(59, 130, 246)"
            : error
              ? "rgb(239, 68, 68)"
              : "rgb(64, 64, 64)",
        }}
        transition={{ duration: 0.2 }}
        className="relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer group hover:border-neutral-500 transition-colors"
        style={{
          background: isDragging
            ? "rgba(59, 130, 246, 0.05)"
            : "rgba(0, 0, 0, 0.2)",
        }}
      >
        <input
          type="file"
          onChange={handleFileInput}
          accept={accept}
          multiple={multiple}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          id="file-upload-input"
        />

        <motion.div
          animate={{
            y: isDragging ? -5 : 0,
          }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{
              scale: isDragging ? 1.2 : 1,
              rotate: isDragging ? 5 : 0,
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center"
          >
            <Upload
              className={`w-8 h-8 ${isDragging ? "text-blue-400" : "text-neutral-400"
                } transition-colors`}
            />
          </motion.div>

          <div className="space-y-2">
            <p className="text-lg font-semibold text-neutral-200">
              {isDragging ? "Drop files here" : "Upload files"}
            </p>
            <p className="text-sm text-neutral-500">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-neutral-600">
              Max {maxFiles} files • {formatFileSize(maxSize)} per file
            </p>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 bottom-4 px-4"
          >
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-sm text-red-400">
              {error}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Selected Files */}
      <AnimatePresence mode="popLayout">
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 space-y-3"
          >
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-semibold text-neutral-300">
                Selected Files ({selectedFiles.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <AnimatePresence mode="popLayout">
                {selectedFiles.map((file, index) => {
                  const FileIcon = getFileIcon(file.type);

                  return (
                    <motion.div
                      key={`${file.name}-${index}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, x: -100 }}
                      transition={{ duration: 0.2 }}
                      className="group relative bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        {/* File Preview or Icon */}
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-neutral-800 flex items-center justify-center flex-shrink-0">
                          {file.preview ? (
                            <img
                              src={file.preview}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FileIcon className="w-6 h-6 text-neutral-500" />
                          )}
                        </div>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-200 truncate">
                            {file.name}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-xs text-neutral-500">
                              {formatFileSize(file.size)}
                            </p>
                            <span className="text-xs text-neutral-600">•</span>
                            <p className="text-xs text-neutral-500 capitalize">
                              {file.type.split("/")[0] || "file"}
                            </p>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFile(index)}
                          className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-red-500/20 border border-neutral-700 hover:border-red-500/30 flex items-center justify-center transition-colors group"
                        >
                          <X className="w-4 h-4 text-neutral-400 group-hover:text-red-400 transition-colors" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}