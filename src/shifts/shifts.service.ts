import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { Shift } from './entities/shift.entity';



@Injectable()
export class ShiftsService {
  private shifts: Shift[] = [];
  private nextId = 1;

  create(createShiftDto: CreateShiftDto): Shift {
    const { startTime, endTime, location } = createShiftDto;

    if (new Date(endTime) <= new Date(startTime)) {
      throw new BadRequestException('End time must be after start time');
    }

    const newShift: Shift = {
      id: this.nextId++,
      startTime,
      endTime,
      location,
    };

    this.shifts.push(newShift);
    return newShift;
  }

  findAll(): Shift[] {
    return this.shifts;
  }

  findOne(id: number): Shift {
    const shift = this.shifts.find((s) => s.id === id);
    if (!shift) throw new NotFoundException(`Shift #${id} not found`);
    return shift;
  }

  update(id: number, updateShiftDto: UpdateShiftDto): Shift {
    const shift = this.findOne(id);

    Object.assign(shift, updateShiftDto);

    if (shift.endTime <= shift.startTime) {
      throw new BadRequestException('End time must be after start time');
    }

    return shift;
  }

  remove(id: number): void {
    const index = this.shifts.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException(`Shift #${id} not found`);
    this.shifts.splice(index, 1);
  }


}
