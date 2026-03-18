# NestJS Module Template

## Creating a New Module

### 1. Generate module structure
```bash
nest generate module modules/example
nest generate service modules/example
nest generate controller modules/example
```

### 2. Module Template (example.module.ts)
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { ExampleEntity } from './entities/example.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExampleEntity])],
  providers: [ExampleService],
  controllers: [ExampleController],
  exports: [ExampleService],
})
export class ExampleModule {}
```

### 3. Service Template (example.service.ts)
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExampleEntity } from './entities/example.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(ExampleEntity)
    private repository: Repository<ExampleEntity>,
  ) {}

  async create(dto: CreateExampleDto): Promise<ExampleEntity> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async findAll(): Promise<ExampleEntity[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<ExampleEntity> {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateExampleDto): Promise<ExampleEntity> {
    await this.repository.update(id, dto);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
```

### 4. Controller Template (example.controller.ts)
```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller('examples')
export class ExampleController {
  constructor(private service: ExampleService) {}

  @Post()
  create(@Body() dto: CreateExampleDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
```

### 5. Entity Template (entities/example.entity.ts)
```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('examples')
export class ExampleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
```

## Core Modules to Implement

1. **Auth Module** - Authentication & Authorization
2. **Users Module** - User management
3. **Facilities Module** - Facility management with geolocation
4. **Courts Module** - Court management
5. **TimeSlots Module** - Availability scheduling
6. **Bookings Module** - Booking management
7. **Tournaments Module** - Tournament management

## Best Practices

- Always use DTOs for request validation
- Use services for business logic
- Controllers should be thin (just handle HTTP)
- Use decorators for cross-cutting concerns
- Implement proper error handling
- Add validation pipes globally
- Use TypeORM transactions for complex operations
