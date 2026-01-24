import React, { useState, useEffect } from "react";
import { Upload, X, CheckCircle2, AlertCircle, Image as ImageIcon, Plus } from "lucide-react";

/**
 * FileUpload - Optimized Professional Grid
 * Fixed layout stretching and text clipping using auto-fit min-max logic.
 */
const FileUpload = ({
    data,
    setData,
    errors,
    clearErrors,
    field = "images",
    label = "Media Assets",
    multiple = true,
    initialData = null,
}) => {
    const [previews, setPreviewList] = useState([]);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        if (initialData) {
            if (Array.isArray(initialData)) {
                const initialPreviews = initialData.map((path) => ({
                    url: `/${path}`,
                    name: path.split("/").pop(),
                    size: "Existing Asset",
                    isExisting: true,
                }));
                setPreviewList(initialPreviews);
            } else if (typeof initialData === "string") {
                setPreviewList([
                    {
                        url: `/${initialData}`,
                        name: initialData.split("/").pop(),
                        size: "Existing Asset",
                        isExisting: true,
                    },
                ]);
            }
        }
    }, [initialData]);

    useEffect(() => {
        return () => {
            previews.forEach((p) => {
                if (!p.isExisting) URL.revokeObjectURL(p.url);
            });
        };
    }, [previews]);

    const handleFiles = (files) => {
        if (!files || files.length === 0) return;

        if (errors && typeof clearErrors === 'function') {
            clearErrors(field);
        }

        const newPreviews = Array.from(files).map((file) => ({
            url: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        }));

        if (multiple) {
            const existing = Array.isArray(data[field]) ? data[field] : [];
            setData(field, [...existing, ...files]);
            setPreviewList((prev) => [...prev, ...newPreviews]);
        } else {
            setData(field, files[0]);
            setPreviewList([newPreviews[0]]);
        }
    };

    const removeFile = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (multiple) {
            const updatedData = Array.from(data[field]).filter((_, i) => i !== index);
            const updatedPreviews = previews.filter((_, i) => i !== index);
            setData(field, updatedData);
            setPreviewList(updatedPreviews);
        } else {
            setData(field, null);
            setPreviewList([]);
        }
    };

    const hasError = errors && typeof errors === 'object' && errors[field];

    return (
        <div className="w-full font-sans antialiased text-[#1d2226]">
            {/* Elegant Header */}
            <div className="flex items-center justify-between mb-3">
                <div>
                    <span className="text-[14px] font-semibold block leading-tight">
                        {label}
                    </span>
                    <p className="text-[11px] text-[#00000099] mt-0.5">
                        {multiple ? "High-res photos (Max 10)" : "Single brand identity asset"}
                    </p>
                </div>
            </div>

            {/* LinkedIn-Inspired Dropzone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
                className={`
                    relative rounded-lg border-2 border-dashed transition-all duration-200 py-4 px-4 cursor-pointer
                    flex flex-col items-center justify-center text-center
                    ${dragActive 
                        ? "border-[#0a66c2] bg-blue-50/50" 
                        : hasError 
                            ? "border-red-300 bg-red-50/30" 
                            : "border-[#1d2226] bg-[#f8f9fa] hover:bg-[#ebebeb] hover:border-[#0a66c2]"
                    }
                `}
            >
                <input
                    type="file"
                    multiple={multiple}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={(e) => handleFiles(e.target.files)}
                />
                
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-[#0a66c2] mx-auto">
                        <Upload size={16} strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                        <p className="text-[12px] font-bold">
                            Click or drag to upload
                        </p>
                        <p className="text-[9px] text-[#666666] mt-0.5 font-medium">
                            Max 20MB • PNG, JPG, WebP
                        </p>
                    </div>
                </div>
            </div>

            {hasError && (
                <div className="flex items-center gap-1.5 mt-2 text-red-600 px-1">
                    <AlertCircle size={14} />
                    <span className="text-[12px] font-bold">{errors[field]}</span>
                </div>
            )}

            {/* PREVIEW GRID - SUPER SMALL OPTIMIZED */}
            {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-3">
                    {previews.map((file, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-[#0000001a] overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
                        >
                            <div className="relative aspect-[4/3] bg-[#f3f2ef]">
                                <img
                                    src={file.url}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                
                                {/* Tiny Primary Chip */}
                                {index === 0 && (
                                    <div className="absolute top-1 left-1 z-10">
                                        <span className="bg-[#0a66c2] text-white text-[7px] font-black uppercase px-1 py-0.5 rounded shadow-sm flex items-center gap-1">
                                            Primary
                                        </span>
                                    </div>
                                )}

                                {/* Delete Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={(e) => removeFile(e, index)}
                                        className="w-6 h-6 rounded-full bg-white text-[#1d2226] flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                    >
                                        <X size={12} strokeWidth={3} />
                                    </button>
                                </div>
                                
                                {/* Mobile Fix: Small X visible */}
                                <div className="sm:hidden absolute top-1 right-1">
                                    <button 
                                        type="button" 
                                        onClick={(e) => removeFile(e, index)}
                                        className="w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center p-1"
                                    >
                                        <X size={10} strokeWidth={4} />
                                    </button>
                                </div>
                            </div>

                            {/* Info Area - Compressed */}
                            <div className="p-1.5 bg-white border-t border-[#0000000a] flex-1 flex flex-col justify-between">
                                <p className="text-[9px] font-bold text-[#1d2226] truncate leading-tight mb-1">
                                    {file.name}
                                </p>
                                <div className="flex items-center justify-between gap-1">
                                    <span className="text-[8px] text-[#666666] font-bold uppercase truncate">
                                        {file.size}
                                    </span>
                                    <div className="flex items-center gap-0.5 text-[#057642] flex-shrink-0">
                                        <CheckCircle2 size={8} strokeWidth={3} />
                                        <span className="text-[7px] font-black uppercase">Sync</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* LinkedIn-Style Slot */}
                    {multiple && previews.length < 10 && (
                        <div className="relative bg-[#f8f9fa] border-2 border-dashed border-[#0000001a] rounded-lg aspect-[4/3] flex flex-col items-center justify-center group hover:bg-white hover:border-[#0a66c2] transition-all cursor-pointer">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                onChange={(e) => handleFiles(e.target.files)}
                            />
                            <div className="w-6 h-6 rounded-full bg-white border border-[#0000000d] flex items-center justify-center text-[#00000066] group-hover:text-[#0a66c2] transition-colors">
                                <Plus size={14} strokeWidth={3} />
                            </div>
                            <span className="mt-1 text-[8px] font-black text-[#00000066] uppercase tracking-wider group-hover:text-[#0a66c2] text-center px-1">
                                Add
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
