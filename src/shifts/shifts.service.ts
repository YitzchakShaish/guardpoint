import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

export interface Shift {
  id: number;
  start: string;
  end: string;
  requiredSoldiers?: number;
  assignedSoldiers: string[];
}

@Injectable()
export class ShiftsService {
  private shifts: Shift[] = [];
  private nextId = 1;

  create(createShiftDto: CreateShiftDto): Shift {
    const { start, end, requiredSoldiers } = createShiftDto;

    if (new Date(end) <= new Date(start)) {
      throw new BadRequestException('End time must be after start time');
    }

    const newShift: Shift = {
      id: this.nextId++,
      start,
      end,
      requiredSoldiers,
      assignedSoldiers: [],
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

    if (shift.end <= shift.start) {
      throw new BadRequestException('End time must be after start time');
    }

    return shift;
  }

  remove(id: number): void {
    const index = this.shifts.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException(`Shift #${id} not found`);
    this.shifts.splice(index, 1);
  }

  assignSoldier(shiftId: number, soldierName: string): Shift {
    const shift = this.findOne(shiftId);

    if (shift.assignedSoldiers.includes(soldierName)) {
      throw new BadRequestException('Soldier already assigned to this shift');
    }

    if (
      shift.requiredSoldiers &&
      shift.assignedSoldiers.length >= shift.requiredSoldiers
    ) {
      throw new BadRequestException('Shift is already full');
    }

    shift.assignedSoldiers.push(soldierName);
    return shift;
  }

   addSoldier(shiftId: number, soldierName: string): Shift {
    const shift = this.findOne(shiftId);

    // Check if the soldier is already assigned
    if (shift.assignedSoldiers.includes(soldierName)) {
      throw new BadRequestException('Soldier already assigned to this shift');
    }

    // Check if the shift is full
    if (
      shift.requiredSoldiers &&
      shift.assignedSoldiers.length >= shift.requiredSoldiers
    ) {
      throw new BadRequestException('Shift is already full');
    }

    shift.assignedSoldiers.push(soldierName);
    return shift;
  }
}
