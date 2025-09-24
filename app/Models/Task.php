<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'completed',
        'due_date',
        //'status',
        'priority',
        'attachment_path'
    ];

    protected $casts = [
        'due_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Accessor for formatted due date
    public function getFormattedDueDateAttribute()
    {
        return $this->due_date ? $this->due_date->format('M d, Y') : null;
    }

    // Check if task is overdue
    public function getIsOverdueAttribute()
    {
        if (!$this->due_date || $this->status === 'completed') {
            return false;
        }

        return $this->due_date->isPast();
    }

    // Get attachment file name
    public function getAttachmentNameAttribute()
    {
        if (!$this->attachment_path) {
            return null;
        }

        return basename($this->attachment_path);
    }

    // Scope for filtering by status
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeOngoing($query)
    {
        return $query->where('status', 'ongoing');
    }

    // Scope for filtering by priority
    public function scopeHighPriority($query)
    {
        return $query->where('priority', 'high');
    }

    public function scopeOverdue($query)
    {
        return $query->where('due_date', '<', now())
                    ->where('status', 'ongoing');
    }
}
