import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { readFile, writeFile } from 'jsonfile';
import { v4 as uuidv4 } from 'uuid';
import { TaskInterface } from './model/task.model';

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
   

  async findAll() {
    // const results: TaskInterface[] = [];
    try{
      const{tasks}: {tasks: TaskInterface[]} = await readFile(this.dataPath);
      return tasks;
    }
    catch(err){
      throw new InternalServerErrorException('Failed to read tasks', err);
    }
  
  }

  async findOne(id: string) {
    try {
      const { tasks }: { tasks: TaskInterface[] } = await readFile(this.dataPath);
      const task = tasks.find((t) => t.id === id);
      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      return task;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to read task');
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const data = await readFile(this.dataPath);
      const index = data.tasks.findIndex((t: TaskInterface) => t.id === id);
      if (index === -1) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      data.tasks[index] = {
        ...data.tasks[index],
        ...updateTaskDto,
        updatedAt: new Date().toISOString(),
      };
      await writeFile(this.dataPath, data, { spaces: 2 });
      return data.tasks[index];
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async patch(id: string, patchTaskDto: PatchTaskDto) {
    try {
      const data = await readFile(this.dataPath);
      const index = data.tasks.findIndex((t: TaskInterface) => t.id === id);
      if (index === -1) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      const definedFields = Object.fromEntries(
        Object.entries(patchTaskDto).filter(([, v]) => v !== undefined),
      );
      data.tasks[index] = {
        ...data.tasks[index],
        ...definedFields,
        updatedAt: new Date().toISOString(),
      };
      await writeFile(this.dataPath, data, { spaces: 2 });
      return data.tasks[index];
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to patch task');
    }
  }

  async remove(id: string) {
    try {
      const data = await readFile(this.dataPath);
      const index = data.tasks.findIndex((t: TaskInterface) => t.id === id);
      if (index === -1) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      const [removed] = data.tasks.splice(index, 1);
      await writeFile(this.dataPath, data, { spaces: 2 });
      return removed;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to remove task');
    }
  }
}
