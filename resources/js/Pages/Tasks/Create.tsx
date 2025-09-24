import React from "react";
import TaskForm from "./TaskForm";
import AppLayout from "@/Layouts/AppLayout";
import '../../../css/task.css';

const Create: React.FC = () => {
  return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 md:p-8">
          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Task</h1>

          {/* Task Form */}
          <TaskForm isEdit={false} />
        </div>
      </div>
  );
};

export default Create;
