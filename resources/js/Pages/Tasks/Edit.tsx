import React from 'react';
import TaskForm from './TaskForm';
import AppLayout from '@/Layouts/AppLayout';

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: 'ongoing' | 'completed';
  priority: 'low' | 'medium' | 'high';
  attachment_path: string;
  attachment_name: string;
}

interface EditProps {
  task: Task;
}

const Edit: React.FC<EditProps> = ({ task }) => {
  return (
    <AppLayout>
      <TaskForm task={task} isEdit={true} />
    </AppLayout>
  );
};

export default Edit;
