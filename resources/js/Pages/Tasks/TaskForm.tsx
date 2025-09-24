import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import '../../../css/task.css';

interface TaskFormProps {
  task?: {
    id: number;
    title: string;
    description: string;
    due_date: string;
    status: 'ongoing' | 'completed';
    priority: 'low' | 'medium' | 'high';
    attachment_path: string;
    attachment_name: string;
  };
  isEdit?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, isEdit = false }) => {
  const { data, setData, post, put, processing, errors, progress } = useForm({
    title: task?.title || '',
    description: task?.description || '',
    due_date: task?.due_date || '',
    status: task?.status || 'ongoing',
    priority: task?.priority || 'medium',
    attachment: null as File | null,
  });

  const [removeAttachment, setRemoveAttachment] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && task) {
      put(route('tasks.update', task.id));
    } else {
      post(route('tasks.store'));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setData('attachment', file);
  };

  return (
    <div className="task-form-container">
      <div className="task-form-card">
        <h2 className="form-title">
          {isEdit ? 'Edit Task' : 'Create New Task'}
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title *
            </label>
            <input
              type="text"
              id="title"
              className={`form-input ${errors.title ? 'error' : ''}`}
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              placeholder="Enter task title"
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              placeholder="Enter task description"
              rows={4}
            />
            {errors.description && <div className="error-message">{errors.description}</div>}
          </div>

          {/* Due Date */}
          <div className="form-group">
            <label htmlFor="due_date" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              className={`form-input ${errors.due_date ? 'error' : ''}`}
              value={data.due_date}
              onChange={e => setData('due_date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.due_date && <div className="error-message">{errors.due_date}</div>}
          </div>

          {/* Priority */}
          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Priority *
            </label>
            <select
              id="priority"
              className={`form-select priority-${data.priority} ${errors.priority ? 'error' : ''}`}
              value={data.priority}
              onChange={e => setData('priority', e.target.value as 'low' | 'medium' | 'high')}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            {errors.priority && <div className="error-message">{errors.priority}</div>}
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status *
            </label>
            <select
              id="status"
              className={`form-select status-${data.status} ${errors.status ? 'error' : ''}`}
              value={data.status}
              onChange={e => setData('status', e.target.value as 'ongoing' | 'completed')}
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && <div className="error-message">{errors.status}</div>}
          </div>

          {/* Current Attachment */}
          {isEdit && task?.attachment_path && !removeAttachment && (
            <div className="form-group">
              <label className="form-label">Current Attachment</label>
              <div className="current-attachment">
                <div className="attachment-info">
                  <span className="attachment-icon">📄</span>
                  <span className="attachment-name">{task.attachment_name}</span>
                  <a
                    href={route('tasks.download-attachment', task.id)}
                    className="download-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setRemoveAttachment(true)}
                  className="remove-attachment-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* File Upload */}
          {(!isEdit || !task?.attachment_path || removeAttachment) && (
            <div className="form-group">
              <label htmlFor="attachment" className="form-label">
                Attachment (PDF only, max 10MB)
              </label>
              <input
                type="file"
                id="attachment"
                className={`form-file ${errors.attachment ? 'error' : ''}`}
                onChange={handleFileChange}
                accept=".pdf"
              />
              {errors.attachment && <div className="error-message">{errors.attachment}</div>}
              {data.attachment && (
                <div className="file-preview">
                  <span className="file-icon">📄</span>
                  <span className="file-name">{data.attachment.name}</span>
                </div>
              )}
            </div>
          )}

          {/* Upload Progress */}
          {progress && (
            <div className="form-group">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
              <p className="progress-text">Uploading... {progress.percentage}%</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <Link
              href={route('tasks.index')}
              className="btn-secondary"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-primary"
              disabled={processing}
            >
              {processing ? 'Saving...' : (isEdit ? 'Update Task' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
