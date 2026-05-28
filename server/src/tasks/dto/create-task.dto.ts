import { CreateTaskInterface ,type TaskPriority,type TaskStatus} from '../model/task.model';
import { IsString, IsOptional, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';
export class CreateTaskDto implements CreateTaskInterface{
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

