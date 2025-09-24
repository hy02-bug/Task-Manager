import React, { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="navbar">
                <div className="nav-container">
                    <h1 className="nav-title">Task Manager - Hello User</h1>
                    <div className="nav-links">
                        <Link href={route('tasks.index')} className="nav-link">
                            Tasks
                        </Link>
                        <Link href={route('tasks.create')} className="nav-link">
                            Add Task
                        </Link>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
};

export default AppLayout;
