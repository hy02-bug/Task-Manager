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
        Schema::table('tasks', function (Blueprint $table) {
            $table->date('due_date')->nullable()->after('description');
            //$table->enum('status', ['ongoing', 'completed'])->default('ongoing')->after('due_date');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium')->after('due_date');
            $table->string('attachment_path')->nullable()->after('priority');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            //$table->dropColumns(['due_date', 'status', 'priority', 'attachment_path']);
            $table->dropColumns(['due_date', 'priority', 'attachment_path']);
        });
    }
};
