import React from "react";
import FileUpload from "@/Components/forms/FileUpload";
import { X, CheckCircle2, Trash2, Camera } from "lucide-react";
import { useForm } from "@inertiajs/react";

const GallerySection = ({
    data,
    errors,
    setData,
    clearErrors,
    existingImages = [],
    onImageRemove,
}) => {
    const { delete: destroy } = useForm();

    const handleRemoveExistingImage = (image) => {
        if (image.id && window.confirm("Are you sure you want to remove this image?")) {
            destroy(route("admin.cars.image.destroy", image.id), {
                preserveScroll: true,
                onSuccess: () => onImageRemove && onImageRemove(image.id),
            });
        }
    };

    return (
        <div className="space-y-10 font-sans">
            {/* Existing Assets Section */}
            {existingImages.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-blue-50 rounded-lg text-[#0a66c2]">
                                <Camera size={16} />
                            </div>
                            <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">
                                Live Fleet Assets ({existingImages.length})
                            </h3>
                        </div>
                        <span className="text-[11px] font-bold text-slate-400  bg-slate-50 px-2 py-0.5 rounded border border-slate-100 ">
                            Published to Marketplace
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {existingImages.map((image, index) => (
                            <div 
                                key={image.id} 
                                className="relative group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 ring-offset-2 hover:ring-2 hover:ring-[#0a66c2]/10"
                            >
                                {/* Primary Image Badge */}
                                {image.is_primary && (
                                    <div className="absolute top-2 left-2 z-20 bg-[#0a66c2] text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2">
                                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                                        Cover Photo
                                    </div>
                                )}

                                <div className="relative aspect-[4/3] bg-gray-100">
                                    <img
                                        src={image.file_path.startsWith("http") ? image.file_path : `/${image.file_path}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt="Car"
                                    />
                                    
                                    {/* Refined Overlay Actions */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveExistingImage(image);
                                            }}
                                            className="bg-white/10 hover:bg-red-500/90 backdrop-blur-md border border-white/20 text-white p-2.5 rounded-full transition-all transform hover:scale-110 flex items-center gap-2 shadow-2xl"
                                        >
                                            <Trash2 size={16} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>

                                {/* Status Footer */}
                                <div className="p-3 bg-white">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-black text-gray-400 tracking-tighter uppercase whitespace-nowrap">
                                            Asset ID #{image.id}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 size={12} className="text-[#057642]" />
                                            <span className="text-[9px] font-bold text-[#057642] uppercase tracking-widest italic">Live</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* New Asset Contribution */}
            <div className="space-y-4 pt-4 border-t border-dashed border-gray-200">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-green-50 rounded-lg text-[#057642]">
                        <CheckCircle2 size={16} />
                    </div>
                    <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">
                        Contribute New Media
                    </h3>
                </div>
                
                <FileUpload
                    field="images"
                    label=""
                    multiple={true}
                    data={data}
                    setData={setData}
                    errors={errors}
                    clearErrors={clearErrors}
                />
            </div>
        </div>
    );
};

export default GallerySection;
