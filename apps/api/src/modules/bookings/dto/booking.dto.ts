import { IsUUID, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  timeSlotId!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateBookingStatusDto {
  @IsEnum(['pending', 'confirmed', 'cancelled', 'completed'])
  status!: 'pending' | 'confirmed' | 'cancelled' | 'completed';

  @IsOptional()
  @IsString()
  notes?: string;
}

export class BookingResponseDto {
  id!: string;
  userId!: string;
  timeSlotId!: string;
  status!: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice!: number;
  notes?: string;
  createdAt!: Date;
}
