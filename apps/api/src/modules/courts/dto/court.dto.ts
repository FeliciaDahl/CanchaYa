import { IsString, IsEnum, IsBoolean, IsNumber, IsUUID } from 'class-validator';

export class CreateCourtDto {
  @IsString()
  name!: string;

  @IsEnum(['clay', 'artificial', 'hard'])
  surface!: 'clay' | 'artificial' | 'hard';

  @IsBoolean()
  hasLights!: boolean;

  @IsNumber()
  capacity!: number;
}

export class UpdateCourtDto {
  name?: string;
  surface?: 'clay' | 'artificial' | 'hard';
  hasLights?: boolean;
  capacity?: number;
}

export class CourtResponseDto {
  id!: string;
  facilityId!: string;
  name!: string;
  surface!: 'clay' | 'artificial' | 'hard';
  hasLights!: boolean;
  capacity!: number;
  createdAt!: Date;
}
