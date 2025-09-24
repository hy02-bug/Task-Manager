import { Task } from './models/Task';

export interface PageProps {
    // For flash messages (success/error notifications)
    flash: {
        success?: string;
        error?: string;
    };

    // Authentication information (if you add user auth later)
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };

    // For the tasks index page
    tasks?: Task[];

    // For the task edit page
    task?: Task;

    // For any errors from form validation
    errors: Record<string, string>;
}
