<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('make');
            $table->string('model');
            $table->year('year');
            $table->enum('rental_type', ['daily', 'weekly', 'monthly'])->default('daily');
            $table->text('description')->nullable();
            
            // Core Specifications (Directly on car for performance)
            $table->string('transmission')->nullable();      // Gear Type: Manual/Automatic
            $table->integer('seats')->nullable();            // 5 Seats
            $table->string('fuel_type')->nullable();         // Petrol/Electric/Hybrid
            $table->string('mileage')->nullable();           // 18 KM
            $table->string('steering')->nullable();          // Left/Right
            $table->string('engine_capacity')->nullable();    // 2500cc
            $table->string('color')->nullable();             // White

            // Base Pricing (Directly on car for easier filtering)
            $table->decimal('daily_rate', 15, 2)->nullable();
            $table->decimal('weekly_rate', 15, 2)->nullable();
            $table->decimal('monthly_rate', 15, 2)->nullable();
            $table->string('currency')->default('৳');

            $table->foreignId('location_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('status', ['available', 'sold', 'reserved'])->default('available');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
