<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class SettingController extends Controller
{
    public function general()
    {
        $settings = Setting::where('group', 'general')->pluck('value', 'key')->toArray();
        return Inertia::render('Admin/Settings/General', [
            'settings' => $settings
        ]);
    }

    public function email()
    {
        $settings = Setting::where('group', 'email')->pluck('value', 'key')->toArray();
        return Inertia::render('Admin/Settings/Email', [
            'settings' => $settings
        ]);
    }

    public function sslCommerz()
    {
        $settings = Setting::where('group', 'sslcommerz')->pluck('value', 'key')->toArray();
        return Inertia::render('Admin/Settings/SslCommerz', [
            'settings' => $settings
        ]);
    }

    public function contact()
    {
        $settings = Setting::where('group', 'contact')->pluck('value', 'key')->toArray();
        return Inertia::render('Admin/Settings/Contact', [
            'settings' => $settings
        ]);
    }

    public function branding()
    {
        $settings = Setting::where('group', 'branding')->pluck('value', 'key')->toArray();
        return Inertia::render('Admin/Settings/Branding', [
            'settings' => $settings
        ]);
    }

    public function seo()
    {
        $settings = Setting::where('group', 'seo')->pluck('value', 'key')->toArray();
        return Inertia::render('Admin/Settings/Seo', [
            'settings' => $settings
        ]);
    }

    public function social()
    {
        $settings = Setting::where('group', 'social')->pluck('value', 'key')->toArray();
        return Inertia::render('Admin/Settings/Social', [
            'settings' => $settings
        ]);
    }

    public function booking()
    {
        $settings = Setting::where('group', 'booking')->pluck('value', 'key')->toArray();
        return Inertia::render('Admin/Settings/Booking', [
            'settings' => $settings
        ]);
    }

    public function notifications()
    {
        $settings = Setting::where('group', 'notifications')->pluck('value', 'key')->toArray();
        return Inertia::render('Admin/Settings/Notifications', [
            'settings' => $settings
        ]);
    }

    public function business()
    {
        $settings = Setting::where('group', 'business')->pluck('value', 'key')->toArray();
        return Inertia::render('Admin/Settings/Business', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $group = $request->input('group', 'general');
        $inputs = $request->except(['group', '_token']);

        foreach ($inputs as $key => $value) {
            Setting::set($key, $value, $group);
        }

        return Redirect::back()->with('success', 'Settings updated successfully.');
    }
}
