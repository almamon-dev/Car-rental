import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { ArrowRight, Briefcase } from 'lucide-react';

export default function Index({ brands }) {
    return (
        <UserLayout>
            <Head title="All Brands" />
            
            <div className="bg-[#f8f9fa] py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            Premium Brands
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Choose from the world's finest automotive manufacturers.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:gap-6 gap-4">
                        {brands.map((brand) => (
                            <Link 
                                key={brand.id} 
                                href={route('car.list', { brand: brand.slug })}
                                className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 aspect-square"
                            >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 flex items-center justify-center">
                                     {brand.logo ? (
                                        <img 
                                            src={`/storage/${brand.logo}`} 
                                            alt={brand.name} 
                                            className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100" 
                                        />
                                     ) : (
                                        <Briefcase size={40} className="text-gray-300 group-hover:text-[#0a66c2] transition-colors" />
                                     )}
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-900 text-center mb-1">{brand.name}</h3>
                                <div className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full group-hover:bg-blue-50 group-hover:text-[#0a66c2] transition-colors">
                                    {brand.cars_count} Models
                                </div>
                            </Link>
                        ))}
                    </div>

                    {brands.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                            <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900">No brands found</h3>
                            <p className="text-gray-500">Please check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
