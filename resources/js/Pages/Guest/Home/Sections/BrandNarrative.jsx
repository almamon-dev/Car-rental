/**
 * Brand Narrative Section
 * 
 * Provides an institutional overview of the brand's philosophy, 
 * commitment to quality, and service standards.
 * 
 * @author AL Mamon
 * @version 1.0.0
 */

import React from "react";
import { useLanguage } from "@/Contexts/LanguageContext";

/**
 * BrandNarrative Component
 * 
 * @returns {JSX.Element}
 */
export default function BrandNarrative() {
    const { t } = useLanguage();
    
    return (
        <section className="bg-white py-12 border-t border-gray-100 font-sans">
            <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-6">
                    
                    {/* --- Primary Narrative: Brand Philosophy --- */}
                    <div>
                        <h2 className="text-[22px] font-bold text-[#081621] mb-4">
                            {t.home.brand_narrative.main_title}
                        </h2>
                        <p className="text-[14px] text-[#666666] leading-[1.6] text-justify">
                            {t.home.brand_narrative.main_desc}
                        </p>
                    </div>

                    {/* --- Technical Highlights: Fleet & Experience --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Fleet Management Info */}
                        <div className="space-y-4">
                            <h3 className="text-[18px] font-bold text-[#081621]">
                                {t.home.brand_narrative.fleet_title}
                            </h3>
                            <p className="text-[13px] text-[#666666] leading-[1.6] text-justify">
                                {t.home.brand_narrative.fleet_desc}
                            </p>
                        </div>
                        
                        {/* Customer Support & Experience */}
                        <div className="space-y-4">
                            <h3 className="text-[18px] font-bold text-[#081621]">
                                {t.home.brand_narrative.experience_title}
                            </h3>
                            <p className="text-[13px] text-[#666666] leading-[1.6] text-justify">
                                {t.home.brand_narrative.experience_desc}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
