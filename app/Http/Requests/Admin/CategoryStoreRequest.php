<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CategoryStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'categories' => 'required|array|min:1',
            'categories.*.name' => 'required|string|max:255|unique:categories,name',
            'categories.*.description' => 'nullable|string',
            'categories.*.image' => 'required|image|mimes:jpeg,png,jpg,webp|max:20048',
        ];
    }

    public function messages(): array
    {
        return [
            'categories.*.name.required' => 'The name field is required.',
            'categories.*.name.unique' => 'This category name has already been taken.',
            'categories.*.image.required' => 'The image field is required.',
        ];
    }
}
