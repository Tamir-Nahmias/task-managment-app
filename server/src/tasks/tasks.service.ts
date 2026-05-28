import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { readFile, writeFile } from 'jsonfile';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private readonly dataPath: string;

  constructor(private readonly configService: ConfigService) {
    this.dataPath = this.configService.getOrThrow<string>('TASKS_FILE_PATH');
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const data = await readFile(this.dataPath);
      const newTask = {
        id: uuidv4(),
        ...createTaskDto,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.tasks.push(newTask);
      await writeFile(this.dataPath, data, { spaces: 2 });
      return newTask;
    } catch (err) {
      throw new InternalServerErrorException('Failed to create task');
    }
  }
   

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  patch(id: number, patchTaskDto: PatchTaskDto) {
    return `This action patches a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
