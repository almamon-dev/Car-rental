<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $query = Contact::query()->with('user:id,name,email');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        $contacts = $query->latest()->paginate($request->per_page ?? 10)->withQueryString();

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
            'filters' => $request->only(['search']),
            'counts' => [
                'all' => Contact::count(),
            ],
        ]);
    }

    public function show(Contact $contact)
    {
        $contact->load('user');
        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $contact
        ]);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return redirect()->back()->with('success', 'Message deleted successfully.');
    }
}
