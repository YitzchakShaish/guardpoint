import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignments } from './entities/assignment.entity';



@Injectable()
export class AssignmentsService {
  private assignments : Assignments[] = [];

  create(dto: CreateAssignmentDto) {
    const newAssignment = {
      id: this.assignments.length + 1,
      soldierId: dto.soldierId,
      shiftId: dto.shiftId,
    };
    this.assignments.push(newAssignment);
    return newAssignment;
  }

  findAll() {
    return this.assignments;
  }


  findOne(id: number) {
    return `This action returns a #${id} assignment`;
  }

  update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignment`;
  }
}
