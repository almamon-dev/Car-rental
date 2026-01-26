import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, User, Car, MapPin, DollarSign, Clock, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';

export default function BookingShow({ auth, booking }) {
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
            ongoing: 'bg-purple-100 text-purple-800 border-purple-200',
            completed: 'bg-green-100 text-green-800 border-green-200',
            cancelled: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const calculateDuration = () => {
        const start = new Date(booking.start_date);
        const end = new Date(booking.end_date);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return days;
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Booking #${booking.id}`} />

            <div className="max-w-7xl mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* Header */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5">
                        <div className="flex items-center justify-between mb-4">
                            <Link
                                href={route('admin.bookings.index')}
                                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0a66c2] hover:text-[#004182] transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Back to Bookings
                            </Link>

                            <div className="flex items-center gap-2">
                                {/* Action buttons can be added here if needed */}
                            </div>
                        </div>

                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#f3f6f8] rounded-lg flex items-center justify-center text-[#0a66c2]">
                                    <Calendar size={24} strokeWidth={2} />
                                </div>
                                <div>
                                    <h1 className="text-[20px] font-bold text-[#000000e6]">
                                        Booking #{booking.id}
                                    </h1>
                                    <p className="text-[13px] text-[#00000099] mt-1 font-medium">
                                        Created {new Date(booking.created_at).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className={`px-4 py-2 rounded-lg border ${getStatusColor(booking.status)}`}>
                                <span className="text-[13px] font-bold uppercase">{booking.status}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-4">
                        
                        {/* Customer Information */}
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <User size={18} className="text-[#0a66c2]" />
                                <h2 className="text-[16px] font-bold text-gray-900">Customer Information</h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                    <span className="text-[13px] font-semibold text-gray-600">Name</span>
                                    <span className="text-[13px] font-bold text-gray-900">{booking.user?.name}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                    <span className="text-[13px] font-semibold text-gray-600">Email</span>
                                    <span className="text-[13px] text-gray-900">{booking.user?.email}</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-[13px] font-semibold text-gray-600">Phone</span>
                                    <span className="text-[13px] text-gray-900">{booking.user?.phone || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Car Information */}
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Car size={18} className="text-[#0a66c2]" />
                                <h2 className="text-[16px] font-bold text-gray-900">Car Details</h2>
                            </div>
                            
                            {booking.car?.images?.[0] && (
                                <div className="mb-4 rounded-lg overflow-hidden">
                                    <img 
                                        src={`/storage/${booking.car.images[0].image_path}`} 
                                        alt={booking.car.name}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                            )}

                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                    <span className="text-[13px] font-semibold text-gray-600">Car Name</span>
                                    <span className="text-[13px] font-bold text-gray-900">{booking.car?.name}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                    <span className="text-[13px] font-semibold text-gray-600">Brand</span>
                                    <span className="text-[13px] text-gray-900">{booking.car?.brand?.name}</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-[13px] font-semibold text-gray-600">Daily Rate</span>
                                    <span className="text-[13px] font-bold text-gray-900">৳{booking.car?.daily_rate?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Booking Timeline */}
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock size={18} className="text-[#0a66c2]" />
                                <h2 className="text-[16px] font-bold text-gray-900">Booking Timeline</h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                    <span className="text-[13px] font-semibold text-gray-600">Start Date</span>
                                    <span className="text-[13px] font-bold text-gray-900">
                                        {new Date(booking.start_date).toLocaleDateString('en-US', { 
                                            weekday: 'short',
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                    <span className="text-[13px] font-semibold text-gray-600">End Date</span>
                                    <span className="text-[13px] font-bold text-gray-900">
                                        {new Date(booking.end_date).toLocaleDateString('en-US', { 
                                            weekday: 'short',
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-[13px] font-semibold text-gray-600">Duration</span>
                                    <span className="text-[13px] font-bold text-[#0a66c2]">{calculateDuration()} Days</span>
                                </div>
                            </div>
                        </div>

                        {/* Location Details */}
                        {(booking.pickup_location || booking.dropoff_location) && (
                            <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin size={18} className="text-[#0a66c2]" />
                                    <h2 className="text-[16px] font-bold text-gray-900">Location Details</h2>
                                </div>
                                <div className="space-y-3">
                                    {booking.pickup_location && (
                                        <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                            <span className="text-[13px] font-semibold text-gray-600">Pickup Location</span>
                                            <span className="text-[13px] text-gray-900">{booking.pickup_location}</span>
                                        </div>
                                    )}
                                    {booking.dropoff_location && (
                                        <div className="flex items-center justify-between py-2">
                                            <span className="text-[13px] font-semibold text-gray-600">Dropoff Location</span>
                                            <span className="text-[13px] text-gray-900">{booking.dropoff_location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Summary */}
                    <div className="space-y-4">
                        
                        {/* Pricing Summary */}
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign size={18} className="text-[#0a66c2]" />
                                <h2 className="text-[16px] font-bold text-gray-900">Pricing Summary</h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                    <span className="text-[13px] font-semibold text-gray-600">Daily Rate</span>
                                    <span className="text-[13px] text-gray-900">৳{booking.car?.daily_rate?.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                    <span className="text-[13px] font-semibold text-gray-600">Duration</span>
                                    <span className="text-[13px] text-gray-900">{calculateDuration()} Days</span>
                                </div>
                                <div className="flex items-center justify-between py-3 bg-emerald-50 -mx-6 px-6 rounded-lg mt-3">
                                    <span className="text-[14px] font-bold text-emerald-900">Total Amount</span>
                                    <span className="text-[18px] font-bold text-emerald-700">৳{booking.total_price?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-6">
                            <h2 className="text-[14px] font-bold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-2">
                                <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-[13px] transition-all flex items-center justify-center gap-2">
                                    <CheckCircle size={16} />
                                    Mark as Confirmed
                                </button>
                                <button className="w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-[13px] transition-all flex items-center justify-center gap-2">
                                    <CheckCircle size={16} />
                                    Mark as Completed
                                </button>
                                <button className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-[13px] transition-all flex items-center justify-center gap-2">
                                    <XCircle size={16} />
                                    Cancel Booking
                                </button>
                            </div>
                        </div>

                        {/* Booking Info */}
                        <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                            <h3 className="text-[12px] font-bold text-gray-700 mb-2">Booking Information</h3>
                            <div className="space-y-1.5 text-[11px] text-gray-600">
                                <p><strong>ID:</strong> #{booking.id}</p>
                                <p><strong>Created:</strong> {new Date(booking.created_at).toLocaleDateString()}</p>
                                <p><strong>Updated:</strong> {new Date(booking.updated_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
