import { IsString, IsOptional, IsNumber, IsArray, IsUUID } from 'class-validator';

export class CreateFacilityDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsArray()
  imageUrls?: string[];
}

export class UpdateFacilityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsArray()
  imageUrls?: string[];
}

export class SearchNearbyDto {
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsOptional()
  @IsNumber()
  radiusKm?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}

export class FacilityResponseDto {
  id!: string;
  ownerId!: string;
  name!: string;
  description?: string;
  address!: string;
  city!: string;
  latitude!: number;
  longitude!: number;
  phone?: string;
  website?: string;
  imageUrls!: string[];
  createdAt!: Date;
}
