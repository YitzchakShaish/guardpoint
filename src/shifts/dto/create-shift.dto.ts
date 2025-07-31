import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateShiftDto {
  @IsDateString()
  start: string; 

  @IsDateString()
  end: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  requiredSoldiers?: number;
}
