import React, { useState, useEffect } from "react";
import { Upload, X, CheckCircle2, AlertCircle, Image as ImageIcon } from "lucide-react";

const FileUpload = ({
    data,
    setData,
    errors,
    clearErrors,
    field = "images",
    label = "Media Assets",
    multiple = true,
}) => {
    const [previews, setPreviews] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
    }, [previews]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        processFiles(files);
    };

    const processFiles = (files) => {
        if (files.length === 0) return;

        if (errors[field]) {
            clearErrors(field);
        }

        const newPreviews = files.map((file) => ({
            url: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        }));

        if (multiple) {
            const currentFiles = data[field] || [];
            setData(field, [...currentFiles, ...files]);
            setPreviews((prev) => [...prev, ...newPreviews]);
        } else {
            setData(field, files[0]);
            setPreviews([newPreviews[0]]);
        }
    };

    const removeImage = (index) => {
        if (multiple) {
            const updatedFiles = Array.from(data[field]).filter(
                (_, i) => i !== index,
            );
            const updatedPreviews = previews.filter((_, i) => i !== index);
            setData(field, updatedFiles);
            setPreviews(updatedPreviews);
        } else {
            setData(field, null);
            setPreviews([]);
        }
    };

    return (
        <div className="w-full font-sans">
            {label && (
                <div className="flex items-center justify-between mb-2.5">
                    <label className="text-[13px] font-semibold text-gray-700">
                        {label}
                    </label>
                    <span className="text-[11px] font-medium text-gray-400 italic">
                        {multiple ? "Max 10 files" : "Single upload"}
                    </span>
                </div>
            )}

            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    processFiles(Array.from(e.dataTransfer.files));
                }}
                className={`relative group border-2 border-dashed rounded-lg p-8 transition-all duration-200
                ${
                    isDragging
                        ? "border-[#0a66c2] bg-blue-50/50 scale-[1.005]"
                        : errors[field]
                          ? "border-red-200 bg-red-50/20"
                          : "border-gray-200 bg-gray-50/30 hover:border-[#0a66c2] hover:bg-white"
                }
                `}
            >
                <input
                    type="file"
                    multiple={multiple}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                />

                <div className="flex flex-col items-center justify-center space-y-3">
                    <div
                        className={`p-3 rounded-full transition-colors duration-300
                        ${isDragging ? "bg-[#0a66c2] text-white" : "bg-white text-[#0a66c2] shadow-sm border border-gray-100 group-hover:border-blue-100"}
                    `}
                    >
                        <Upload size={22} />
                    </div>

                    <div className="text-center">
                        <p className="text-[14px] font-semibold text-gray-900 leading-snug">
                            Drag photo here or <span className="text-[#0a66c2] hover:underline cursor-pointer">upload from computer</span>
                        </p>
                        <p className="text-[12px] text-gray-500 mt-1 font-medium">
                            Supported formats: PNG, JPG, WEBP (Max 20MB)
                        </p>
                    </div>
                </div>
            </div>

            {errors[field] && (
                <div className="flex items-center gap-2 mt-2.5 text-red-600 font-medium text-[12px] animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={14} className="flex-shrink-0" />
                    <span>{errors[field]}</span>
                </div>
            )}

            {/* Previews - High Performance Gallery Grid */}
            {previews.length > 0 && (
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {previews.map((file, index) => (
                        <div
                            key={index}
                            className="relative group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 ring-offset-2 hover:ring-2 hover:ring-[#0a66c2]/10"
                        >
                            {/* Primary Image Badge */}
                            {index === 0 && (
                                <div className="absolute top-2 left-2 z-20 bg-[#0a66c2] text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2">
                                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                                    Cover Photo
                                </div>
                            )}

                            <div className="relative aspect-[4/3] bg-gray-100">
                                <img
                                    src={file.url}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="preview"
                                />
                                
                                {/* Refined Overlay Actions */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeImage(index);
                                        }}
                                        className="bg-white/10 hover:bg-red-500/90 backdrop-blur-md border border-white/20 text-white p-2.5 rounded-full transition-all transform hover:scale-110 flex items-center gap-2 shadow-2xl"
                                    >
                                        <X size={16} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="p-3 bg-white">
                                <p className="text-[11px] font-bold text-gray-800 truncate mb-1">
                                    {file.name}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-black text-gray-400 tracking-tighter uppercase">
                                        {file.size}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <CheckCircle2 size={12} className="text-[#057642]" />
                                        <span className="text-[9px] font-bold text-[#057642] uppercase tracking-widest">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Advanced Placeholder Slot */}
                    {multiple && previews.length < 10 && (
                        <div className="relative bg-gray-50/30 border-2 border-dashed border-gray-200 rounded-xl aspect-[4/3] transition-all hover:bg-white hover:border-[#0a66c2]/50 group overflow-hidden">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                onChange={handleFileChange}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#0a66c2] group-hover:scale-110 transition-all">
                                    <ImageIcon size={20} />
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#0a66c2]">Add More</p>
                                    <p className="text-[9px] text-gray-300 font-medium">{10 - previews.length} slots left</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
