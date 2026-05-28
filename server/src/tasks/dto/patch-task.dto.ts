import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

// Inherits all class-validator decorators from CreateTaskDto via PartialType,
// making all fields optional — no need to redeclare fields or validators here.
export class PatchTaskDto extends PartialType(CreateTaskDto) {}
