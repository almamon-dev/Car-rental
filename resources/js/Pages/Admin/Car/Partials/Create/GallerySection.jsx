import React from "react";
import FileUpload from "@/Components/forms/FileUpload";
import { Info } from "lucide-react";

const GallerySection = ({ data, errors, setData, clearErrors }) => {
    return (
        <div className="space-y-6">
            <div className="w-full">
                <FileUpload
                    field="images"
                    label="Vehicle Media"
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
