<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::latest()->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks
        ]);
    }

    public function create()
    {
        return Inertia::render('Tasks/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date|after_or_equal:today',
            'status' => 'required|in:ongoing,completed',
            'priority' => 'required|in:low,medium,high',
            'attachment' => 'nullable|file|mimes:pdf|max:10240' // 10MB max
        ]);

        // Handle file upload
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('task-attachments', 'public');
            $validated['attachment_path'] = $attachmentPath;
        }

        Task::create($validated);

        return redirect()->route('tasks.index')
            ->with('success', 'Task created successfully!');
    }

    public function show(Task $task)
    {
        return Inertia::render('Tasks/Show', [
            'task' => $task
        ]);
    }

    public function edit(Task $task)
    {
        return Inertia::render('Tasks/Edit', [
            'task' => $task
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|in:ongoing,completed',
            'priority' => 'required|in:low,medium,high',
            'attachment' => 'nullable|file|mimes:pdf|max:10240'
        ]);

        // Handle file upload
        if ($request->hasFile('attachment')) {
            // Delete old attachment if exists
            if ($task->attachment_path && Storage::disk('public')->exists($task->attachment_path)) {
                Storage::disk('public')->delete($task->attachment_path);
            }

            $attachmentPath = $request->file('attachment')->store('task-attachments', 'public');
            $validated['attachment_path'] = $attachmentPath;
        }

        $task->update($validated);

        return redirect()->route('tasks.index')
            ->with('success', 'Task updated successfully!');
    }

    public function destroy(Task $task)
    {
        // Delete attachment file if exists
        if ($task->attachment_path && Storage::disk('public')->exists($task->attachment_path)) {
            Storage::disk('public')->delete($task->attachment_path);
        }

        $task->delete();

        return redirect()->route('tasks.index')
            ->with('success', 'Task deleted successfully!');
    }

    public function downloadAttachment(Task $task)
    {
        if (!$task->attachment_path || !Storage::disk('public')->exists($task->attachment_path)) {
            abort(404, 'Attachment not found');
        }

        return Storage::disk('public')->download($task->attachment_path, $task->attachment_name);
    }

    public function toggleStatus(Task $task)
    {
        $task->update([
            'status' => $task->status === 'completed' ? 'ongoing' : 'completed'
        ]);

        return back()->with('success', 'Task status updated!');
    }
}
