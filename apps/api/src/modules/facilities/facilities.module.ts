import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from '../../../database/entities/index';
import { FacilitiesService } from './services/facilities.service';
import { FacilitiesController } from './controllers/facilities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Facility])],
  providers: [FacilitiesService],
  controllers: [FacilitiesController],
  exports: [FacilitiesService],
})
export class FacilitiesModule {}
