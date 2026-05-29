import { UpdateTaskInterface, type TaskStatus, type TaskPriority } from '../model/task.model';
import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateTaskDto implements UpdateTaskInterface {
  @IsString({ message: i18nValidationMessage('errors.VALIDATION.TITLE_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('errors.VALIDATION.TITLE_REQUIRED') })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['pending', 'in_progress', 'done'], { message: i18nValidationMessage('errors.VALIDATION.STATUS_INVALID') })
  status: TaskStatus;

  @IsEnum(['low', 'medium', 'high'], { message: i18nValidationMessage('errors.VALIDATION.PRIORITY_INVALID') })
  priority: TaskPriority;
}
