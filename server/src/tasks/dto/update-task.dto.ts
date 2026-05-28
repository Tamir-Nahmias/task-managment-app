import { UpdateTaskInterface, type TaskStatus, type TaskPriority } from '../model/task.model';
import { IsString, IsOptional, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto implements UpdateTaskInterface {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(['pending', 'in_progress', 'done'])
    status: TaskStatus;

    @IsEnum(['low', 'medium', 'high'])
    priority: TaskPriority;

    @IsDateString()
    @IsNotEmpty()
    dueDate: Date;
}
