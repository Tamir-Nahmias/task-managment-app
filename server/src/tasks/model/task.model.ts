export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in_progress' | 'TaskStatus';

export interface TaskInterface {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTaskInterface {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
}

export interface UpdateTaskInterface {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
}

export interface PatchTaskInterface {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
}
