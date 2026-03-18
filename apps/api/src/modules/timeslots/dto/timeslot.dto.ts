import { IsDate, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTimeSlotDto {
  @Type(() => Date)
  @IsDate()
  startTime!: Date;

  @Type(() => Date)
  @IsDate()
  endTime!: Date;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}

export class UpdateTimeSlotDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startTime?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endTime?: Date;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}

export class TimeSlotResponseDto {
  id!: string;
  courtId!: string;
  startTime!: Date;
  endTime!: Date;
  price!: number;
  available!: boolean;
  createdAt!: Date;
}
