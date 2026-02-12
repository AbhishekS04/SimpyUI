"use client";

import React, { useState } from "react";
import FileUpload from "./file-upload";

const ControlButton = ({
  label,
  onClick,
  isActive,
  className = "",
}: {
  label: string;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center h-10 px-4 rounded-full transition-all duration-200 text-[13px] font-medium
      ${isActive
        ? "bg-white text-black font-semibold shadow-lg scale-105"
        : "bg-[#2c2c2e] text-neutral-300 hover:bg-[#3a3a3c] hover:text-white"
      } ${className}`}
  >
    {label}
  </button>
);

const FloatingControls = ({
  clearFiles,
  hasFiles,
}: {
  clearFiles: () => void;
  hasFiles: boolean;
}) => null; // Remove the entire card by returning null

export default function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  const clearFiles = () => setFiles([]);

  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col items-center">
      <div className="flex-1 w-full relative">
        <div className="w-full max-w-4xl mx-auto min-h-96 rounded-lg flex flex-col items-center justify-center">
          <FileUpload onChange={handleFileUpload} />
          {files.length > 0 && (
            <ul className="mt-4 text-sm text-neutral-700 dark:text-neutral-200">
              {files.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <FloatingControls clearFiles={clearFiles} hasFiles={files.length > 0} />
    </div>
  );
}