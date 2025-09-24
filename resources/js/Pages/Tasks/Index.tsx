import React, { useState } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import '../../../css/task.css';

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  formatted_due_date: string;
  status: 'ongoing' | 'completed';
  priority: 'low' | 'medium' | 'high';
  attachment_path: string;
  attachment_name: string;
  is_overdue: boolean;
  created_at: string;
  updated_at: string;
}

interface TasksIndexProps {
  tasks: Task[];
}

const TasksIndex: React.FC<TasksIndexProps> = ({ tasks }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const { post } = useForm();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'ongoing') return task.status === 'ongoing';
    if (filter === 'overdue') return task.is_overdue;
    if (filter === 'high') return task.priority === 'high';
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'due_date') {
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const toggleTaskStatus = (taskId: number) => {
    post(route('tasks.toggle-status', taskId));
  };

 const deleteTask = (taskId: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      router.delete(route('tasks.destroy', taskId), {
        onSuccess: () => {
          // Optional: You can add a success message here
          console.log('Task deleted successfully');
        },
        onError: (errors) => {
          // Optional: Handle errors
          console.error('Error deleting task:', errors);
        }
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return priority;
    }
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const ongoing = tasks.filter(t => t.status === 'ongoing').length;
    const overdue = tasks.filter(t => t.is_overdue).length;
    const highPriority = tasks.filter(t => t.priority === 'high').length;

    return { total, completed, ongoing, overdue, highPriority };
  };

  return (

      <div className="tasks-container">
        {/* Header */}
        <div className="tasks-header">
          <h1 className="page-title">Task Manager</h1>
          <Link href={route('tasks.create')} className="btn-primary">
            + Add New Task
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{getTaskStats().total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{getTaskStats().ongoing}</div>
            <div className="stat-label">Ongoing</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{getTaskStats().completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{getTaskStats().overdue}</div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="controls">
          <div className="filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({tasks.length})
            </button>
            <button
              className={`filter-btn ${filter === 'ongoing' ? 'active' : ''}`}
              onClick={() => setFilter('ongoing')}
            >
              Ongoing ({getTaskStats().ongoing})
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({getTaskStats().completed})
            </button>
            <button
              className={`filter-btn ${filter === 'overdue' ? 'active' : ''}`}
              onClick={() => setFilter('overdue')}
            >
              Overdue ({getTaskStats().overdue})
            </button>
            <button
              className={`filter-btn ${filter === 'high' ? 'active' : ''}`}
              onClick={() => setFilter('high')}
            >
              High Priority ({getTaskStats().highPriority})
            </button>
          </div>

          <div className="sort-controls">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="created_at">Created Date</option>
              <option value="due_date">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="tasks-grid">
          {sortedTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No tasks found</h3>
              <p>
                {filter === 'all'
                  ? "You don't have any tasks yet. Create your first task to get started!"
                  : `No tasks match the "${filter}" filter.`
                }
              </p>
            </div>
          ) : (
            sortedTasks.map(task => (
              <div
                key={task.id}
                className={`task-card ${task.status} ${task.is_overdue ? 'overdue' : ''}`}
              >
                {/* Task Header */}
                <div className="task-header">
                  <div className="task-title-section">
                    <h3 className="task-title">{task.title}</h3>
                    <div className="task-meta">
                      <span
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      >
                        {getPriorityLabel(task.priority)}
                      </span>
                      <span className={`status-badge ${task.status}`}>
                        {task.status === 'completed' ? '✓ Completed' : '⏳ Ongoing'}
                      </span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`status-toggle ${task.status}`}
                      title={task.status === 'completed' ? 'Mark as ongoing' : 'Mark as completed'}
                    >
                      {task.status === 'completed' ? '↩️' : '✓'}
                    </button>
                  </div>
                </div>

                {/* Task Description */}
                {task.description && (
                  <div className="task-description">
                    <p>{task.description}</p>
                  </div>
                )}

                {/* Task Details */}
                <div className="task-details">
                  {task.due_date && (
                    <div className={`due-date ${task.is_overdue ? 'overdue' : ''}`}>
                      <span className="detail-icon">📅</span>
                      <span className="detail-text">
                        Due: {task.formatted_due_date || task.due_date}
                        {task.is_overdue && <span className="overdue-text"> (Overdue)</span>}
                      </span>
                    </div>
                  )}

                  {task.attachment_path && (
                    <div className="attachment-info">
                      <span className="detail-icon">📎</span>
                      <a
                        href={route('tasks.download-attachment', task.id)}
                        className="attachment-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {task.attachment_name || 'Download attachment'}
                      </a>
                    </div>
                  )}
                </div>

                {/* Task Footer */}
                <div className="task-footer">
                  <div className="task-date">
                    Created: {new Date(task.created_at).toLocaleDateString()}
                  </div>
                  <div className="task-controls">
                    <Link
                      href={route('tasks.edit', task.id)}
                      className="btn-edit"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => deleteTask(task.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

  );
};

export default TasksIndex;
