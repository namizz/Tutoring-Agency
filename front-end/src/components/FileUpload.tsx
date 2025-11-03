// components/FileDropZone.tsx
import React, { useState, useEffect } from "react";

interface FileDropZoneProps {
  label: string;
  id: string;
  onFileSelect: (file: File | null) => void;
  defaultFile?: File | null;
  error?: string;
  required?: boolean;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
  label,
  id,
  onFileSelect,
  defaultFile,
  error,
  required,
}) => {
  const [file, setFile] = useState<File | null>(defaultFile || null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (defaultFile) {
      setFile(defaultFile);
      setPreview(
        defaultFile.type.startsWith("image/")
          ? URL.createObjectURL(defaultFile)
          : null
      );
    }
  }, [defaultFile]);

  const handleFile = (file: File | null) => {
    setFile(file);
    setPreview(
      file && file.type.startsWith("image/") ? URL.createObjectURL(file) : null
    );
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const handleRemove = () => {
    handleFile(null);
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      {file ? (
        <div className="border border-gray-300 rounded-xl p-4 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-16 w-16 object-cover rounded-md"
              />
            ) : (
              <div className="flex items-center gap-2">
                <svg
                  className="w-10 h-10 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" />
                  <path d="M5 8h10v1H5V8z" />
                </svg>
                <span className="text-sm font-medium text-gray-700 max-w-xs truncate">
                  {file.name}
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById(id)?.click()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
            ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50 hover:border-gray-400"
            }
          `}
        >
          <p className="text-gray-500">
            Drag & Drop or{" "}
            <span className="text-blue-600 underline">Click to Upload</span>{" "}
            (image or PDF)
          </p>
        </div>
      )}

      <input
        type="file"
        id={id}
        accept="image/*,application/pdf"
        onChange={handleChange}
        className="hidden"
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FileDropZone;
