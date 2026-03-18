import { IsString, IsNumber, IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTournamentDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  maxParticipants!: number;

  @Type(() => Date)
  @IsDate()
  startDate!: Date;

  @Type(() => Date)
  @IsDate()
  endDate!: Date;
}

export class UpdateTournamentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  maxParticipants?: number;

  @IsOptional()
  @IsEnum(['upcoming', 'ongoing', 'completed', 'cancelled'])
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export class TournamentResponseDto {
  id!: string;
  facilityId!: string;
  name!: string;
  description?: string;
  maxParticipants!: number;
  currentParticipants!: number;
  startDate!: Date;
  endDate!: Date;
  status!: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt!: Date;
}
