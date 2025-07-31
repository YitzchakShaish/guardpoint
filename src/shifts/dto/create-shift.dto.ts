import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateShiftDto {
  @IsDateString()
  startTime: string; 

  @IsDateString()
  endTime: string;

  @IsString()
  location: string;
}
