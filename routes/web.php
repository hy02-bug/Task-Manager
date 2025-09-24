<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;

// Redirect root "/" directly to /tasks
Route::get('/', function () {
    return redirect()->route('tasks.index');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('tasks', TaskController::class);

    Route::post('/tasks/{task}/toggle-status', [TaskController::class, 'toggleStatus'])
        ->name('tasks.toggle-status');

    Route::get('/tasks/{task}/download-attachment', [TaskController::class, 'downloadAttachment'])
        ->name('tasks.download-attachment');
});

require __DIR__.'/auth.php';

