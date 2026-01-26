import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { ArrowRight, Tag } from 'lucide-react';

export default function Index({ categories }) {
    return (
        <UserLayout>
            <Head title="All Categories" />
            
            <div className="bg-[#f8f9fa] py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            Explore by Category
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Find the perfect vehicle type for your journey. From economy to luxury, we have it all.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link 
                                key={category.id} 
                                href={route('car.list', { category: category.slug })}
                                className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
                            >
                                <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                                     {category.image ? (
                                        <img 
                                            src={`/storage/${category.image}`} 
                                            alt={category.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        />
                                     ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <Tag size={40} className="text-gray-300" />
                                        </div>
                                     )}
                                     <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0a66c2] transition-colors">{category.name}</h3>
                                        <span className="bg-blue-50 text-[#0a66c2] text-[11px] font-black px-2.5 py-1 rounded-full">{category.cars_count} Cars</span>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
                                        {category.description || `Browse our selection of ${category.name} vehicles.`}
                                    </p>
                                    <div className="mt-4 flex items-center text-[13px] font-bold text-[#0a66c2]">
                                        Browse Vehicles <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {categories.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                            <Tag size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900">No categories found</h3>
                            <p className="text-gray-500">Please check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
