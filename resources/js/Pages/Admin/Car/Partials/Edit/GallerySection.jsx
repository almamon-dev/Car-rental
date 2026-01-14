import React from "react";
import FileUpload from "@/Components/forms/FileUpload";
import { X, Image as ImageIcon, Star, Info } from "lucide-react";
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

    const handleSetPrimary = (index) => {
        const updatedImages = [...data.images];
        updatedImages.forEach((img, i) => {
            img.is_primary = i === index;
        });
        setData("images", updatedImages);
    };

    const handleRemoveExistingImage = (image) => {
        if (
            image.id &&
            window.confirm("Are you sure you want to delete this image?")
        ) {
            destroy(route("admin.cars.image.destroy", image.id), {
                preserveScroll: true,
                onSuccess: () => {
                    if (onImageRemove) {
                        onImageRemove(image.id);
                    }
                },
            });
        }
    };

    const handleRemoveNewImage = (index) => {
        const updatedImages = [...data.images];
        updatedImages.splice(index, 1);
        setData("images", updatedImages);
    };

    return (
        <div className="space-y-6">
            {/* Existing Images */}
            {existingImages && existingImages.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
                            Existing Images
                        </label>
                        <span className="text-xs text-slate-500">
                            {existingImages.length} image(s)
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {existingImages.map((image, index) => (
                            <div
                                key={image.id || index}
                                className="relative group rounded-lg overflow-hidden border border-slate-200"
                            >
                                {/* Image */}
                                <div className="aspect-square bg-slate-100 flex items-center justify-center">
                                    {image.file_path ? (
                                        <img
                                            src={
                                                image.file_path.startsWith(
                                                    "http"
                                                )
                                                    ? image.file_path
                                                    : `/${image.file_path}`
                                            }
                                            alt={`Vehicle image ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <ImageIcon className="w-8 h-8 text-slate-400" />
                                    )}
                                </div>

                                {/* Primary Badge */}
                                {image.is_primary && (
                                    <div className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                                        <Star size={8} />
                                        <span>Primary</span>
                                    </div>
                                )}

                                {/* Remove Button */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemoveExistingImage(image)
                                    }
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="text-xs text-slate-500 flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                        <Info size={12} />
                        <span>
                            Click the X button to remove existing images. Images
                            will be permanently deleted when you save changes.
                        </span>
                    </div>
                </div>
            )}

            {/* New Images Upload */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
                        Upload New Images
                    </label>
                    <span className="text-xs text-slate-500">
                        Max 10 images • PNG, JPG, WEBP
                    </span>
                </div>

                <FileUpload
                    field="images"
                    label=""
                    multiple={true}
                    data={data}
                    setData={setData}
                    errors={errors}
                    clearErrors={clearErrors}
                    accept="image/*"
                />

                {/* Preview of newly uploaded images */}
                {data.images && data.images.length > 0 && (
                    <div className="mt-4">
                        <div className="text-xs font-medium text-slate-700 mb-2">
                            New Uploads (
                            {
                                data.images.filter((img) => img instanceof File)
                                    .length
                            }
                            )
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {data.images
                                .filter((img) => img instanceof File)
                                .map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative group rounded-lg overflow-hidden border border-slate-200"
                                    >
                                        <div className="aspect-square bg-slate-100">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`New upload ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Remove Button for new uploads */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveNewImage(index)
                                            }
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Help Text */}
            <div className="text-xs text-slate-500 space-y-1">
                <p>• First image will be set as primary by default</p>
                <p>• Recommended size: 1200×800 pixels</p>
                <p>• Max file size: 5MB per image</p>
            </div>
        </div>
    );
};

export default GallerySection;
