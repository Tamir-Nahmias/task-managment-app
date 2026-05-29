import { CreateTaskInterface, type TaskPriority, type TaskStatus } from '../model/task.model';
import { IsString, IsOptional, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateTaskDto implements CreateTaskInterface {
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

  @IsDateString({}, { message: i18nValidationMessage('errors.VALIDATION.DUE_DATE_INVALID') })
  @IsNotEmpty({ message: i18nValidationMessage('errors.VALIDATION.DUE_DATE_INVALID') })
  dueDate: Date;
}

