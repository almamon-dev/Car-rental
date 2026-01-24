<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CarStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Basic Info
            'brand_id' => ['required', 'exists:brands,id'],
            'category_id' => ['required', 'exists:categories,id'],
            'location_id' => ['required', 'exists:locations,id'],
            'make' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'min:1950', 'max:'.(date('Y') + 5)],
            'rental_type' => ['required', 'in:daily,weekly,monthly'],
            'description' => ['required', 'string', 'min:10'],

            // Specifications
            'transmission' => ['required', 'string'],
            'mileage' => ['required', 'string'],
            'fuel_type' => ['required', 'string'],
            'steering' => ['required', 'string'],
            'model_year' => ['required', 'integer'],
            'vehicle_type' => ['required', 'string'],
            'engine_capacity' => ['required', 'string'],
            'color' => ['required', 'string'],

            // Pricing
            'daily_rate' => ['required', 'numeric', 'min:1'],
            'weekly_rate' => ['required', 'numeric', 'min:1'],
            'monthly_rate' => ['required', 'numeric', 'min:1'],
            'security_deposit' => ['required', 'numeric', 'min:0'],
            'tax_percentage' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'string'],

            // Documents
            'registration_number' => ['required', 'string', 'unique:car_police_documents,registration_number'],
            'chassis_number' => ['required', 'string'],
            'engine_number' => ['required', 'string'],
            'tax_token_expiry' => ['required', 'date'],
            'fitness_expiry' => ['required', 'date'],

            // Features
            'features' => ['required', 'array', 'min:1'],
            'features.*.feature_name' => ['required', 'string'],

            // FAQs
            'faqs' => ['array'],
            'faqs.*.question' => ['required_with:faqs.*.answer', 'string'],
            'faqs.*.answer' => ['required_with:faqs.*.question', 'string'],

            // Images
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240'],
        ];
    }

    public function messages(): array
    {
        return [
            'features.required' => 'At least one feature is required.',
            'features.*.feature_name.required' => 'Feature name is required.',
            'images.required' => 'At least one image is required.',
            'images.*.image' => 'Each file must be an image.',
            'registration_number.unique' => 'This registration number already exists.',
        ];
    }

    public function prepareForValidation()
    {
        // Ensure empty FAQ entries are removed
        if ($this->has('faqs')) {
            $faqs = array_filter($this->faqs, function ($faq) {
                return ! empty($faq['question']) && ! empty($faq['answer']);
            });
            $this->merge(['faqs' => array_values($faqs)]);
        }

        // Ensure empty feature entries are removed
        if ($this->has('features')) {
            $features = array_filter($this->features, function ($feature) {
                return ! empty($feature['feature_name']);
            });
            $this->merge(['features' => array_values($features)]);
        }
    }
}
