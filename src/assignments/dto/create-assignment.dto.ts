import { IsInt, IsPositive } from 'class-validator';

export class CreateAssignmentDto {
  @IsInt()
  @IsPositive()
  soldierId: number;

  @IsInt()
  @IsPositive()
  shiftId: number;
}
