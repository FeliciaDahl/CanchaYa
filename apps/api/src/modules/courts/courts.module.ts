import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court, Facility } from '../../database/entities';
import { CourtsService } from './services/courts.service';
import { CourtsController } from './controllers/courts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Court, Facility])],
  providers: [CourtsService],
  controllers: [CourtsController],
  exports: [CourtsService],
})
export class CourtsModule {}
