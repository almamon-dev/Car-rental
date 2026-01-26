<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General Settings
            ['group' => 'general', 'key' => 'site_name', 'value' => 'Car Rental Pro'],
            ['group' => 'general', 'key' => 'site_description', 'value' => 'Premium car rental service with the best vehicles and customer support.'],
            ['group' => 'general', 'key' => 'timezone', 'value' => 'Asia/Dhaka'],
            ['group' => 'general', 'key' => 'currency_symbol', 'value' => '৳'],
            
            // Branding
            ['group' => 'branding', 'key' => 'site_logo', 'value' => null],
            ['group' => 'branding', 'key' => 'favicon', 'value' => null],
            ['group' => 'branding', 'key' => 'primary_color', 'value' => '#0a66c2'],
            ['group' => 'branding', 'key' => 'secondary_color', 'value' => '#ff6b35'],
            
            // SEO
            ['group' => 'seo', 'key' => 'meta_keywords', 'value' => 'car rental, vehicle rental, rent a car, car hire, affordable car rental'],
            ['group' => 'seo', 'key' => 'google_analytics_id', 'value' => null],
            ['group' => 'seo', 'key' => 'facebook_pixel_id', 'value' => null],
            ['group' => 'seo', 'key' => 'google_tag_manager_id', 'value' => null],
            
            // Social Media
            ['group' => 'social', 'key' => 'facebook_url', 'value' => 'https://facebook.com'],
            ['group' => 'social', 'key' => 'twitter_url', 'value' => 'https://twitter.com'],
            ['group' => 'social', 'key' => 'instagram_url', 'value' => 'https://instagram.com'],
            ['group' => 'social', 'key' => 'linkedin_url', 'value' => 'https://linkedin.com'],
            ['group' => 'social', 'key' => 'youtube_url', 'value' => null],
            
            // Booking Settings
            ['group' => 'booking', 'key' => 'minimum_booking_hours', 'value' => '24'],
            ['group' => 'booking', 'key' => 'maximum_advance_days', 'value' => '90'],
            ['group' => 'booking', 'key' => 'cancellation_hours', 'value' => '24'],
            ['group' => 'booking', 'key' => 'security_deposit_percentage', 'value' => '20'],
            ['group' => 'booking', 'key' => 'late_return_fee_per_hour', 'value' => '500'],
            ['group' => 'booking', 'key' => 'allow_instant_booking', 'value' => 'true'],
            
            // Notification Settings
            ['group' => 'notifications', 'key' => 'email_notifications', 'value' => 'true'],
            ['group' => 'notifications', 'key' => 'sms_notifications', 'value' => 'false'],
            ['group' => 'notifications', 'key' => 'admin_email', 'value' => 'admin@carrental.com'],
            ['group' => 'notifications', 'key' => 'booking_notification_email', 'value' => 'bookings@carrental.com'],
            
            // Business Information
            ['group' => 'business', 'key' => 'company_name', 'value' => 'Car Rental Pro Ltd.'],
            ['group' => 'business', 'key' => 'company_address', 'value' => 'Dhaka, Bangladesh'],
            ['group' => 'business', 'key' => 'company_phone', 'value' => '+880 1234-567890'],
            ['group' => 'business', 'key' => 'company_email', 'value' => 'info@carrental.com'],
            ['group' => 'business', 'key' => 'business_hours', 'value' => 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM'],
            ['group' => 'business', 'key' => 'tax_number', 'value' => 'TIN-123456789'],
            ['group' => 'business', 'key' => 'vat_percentage', 'value' => '15'],
            
            // Email Settings
            ['group' => 'email', 'key' => 'mail_driver', 'value' => 'smtp'],
            ['group' => 'email', 'key' => 'mail_host', 'value' => 'smtp.gmail.com'],
            ['group' => 'email', 'key' => 'mail_port', 'value' => '587'],
            ['group' => 'email', 'key' => 'mail_username', 'value' => null],
            ['group' => 'email', 'key' => 'mail_password', 'value' => null],
            ['group' => 'email', 'key' => 'mail_encryption', 'value' => 'tls'],
            ['group' => 'email', 'key' => 'mail_from_address', 'value' => 'noreply@carrental.com'],
            ['group' => 'email', 'key' => 'mail_from_name', 'value' => 'Car Rental Pro'],
            
            // SSLCommerz Settings
            ['group' => 'sslcommerz', 'key' => 'store_id', 'value' => null],
            ['group' => 'sslcommerz', 'key' => 'store_password', 'value' => null],
            ['group' => 'sslcommerz', 'key' => 'sandbox_mode', 'value' => 'true'],
            
            // Contact Settings
            ['group' => 'contact', 'key' => 'contact_email', 'value' => 'contact@carrental.com'],
            ['group' => 'contact', 'key' => 'support_phone', 'value' => '+880 1234-567890'],
            ['group' => 'contact', 'key' => 'whatsapp_number', 'value' => '+880 1234-567890'],

            // Legal Settings
            ['group' => 'legal', 'key' => 'terms_of_service', 'value' => '<h2>1. Acceptance of Terms</h2><p>By access and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p><h2>2. Use of Assets</h2><p>All rental cars must be used in accordance with the safety protocols defined in your rental agreement.</p>'],
            ['group' => 'legal', 'key' => 'privacy_policy', 'value' => '<h2>1. Data Collection</h2><p>We collect information to provide better services to all our users. We do not sell your personal information to third parties.</p><h2>2. Data Security</h2><p>We use encrypted protocols to protect your personal identity and mobility logs.</p>'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['group' => $setting['group'], 'key' => $setting['key']],
                ['value' => $setting['value']]
            );
        }
    }
}
