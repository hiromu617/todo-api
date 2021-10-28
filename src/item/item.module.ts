import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from 'src/entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './item.controller';

@Module({
  providers: [ItemService],
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemController],
})
export class ItemModule {}
