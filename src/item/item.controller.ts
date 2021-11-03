import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from '../entities/item.entity';
import { CreateItemDTO, FindItemDTO, UpdateItemDTO } from './item.dto';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';

@Controller('item')
export class ItemController {
  // サービスの呼び出し
  constructor(private readonly service: ItemService) {}

  // `item`のURIへのGETメソッドでデータ全件取得．サービスの`findAll()`関数を実行．
  @Get()
  async getItemList(): Promise<Item[]> {
    return await this.service.findAll();
  }

  // 特定のuser_idを持つitemを取得
  @Get(':user_id')
  async getItemListFromUserId(
    @Param('user_id') user_id: string,
  ): Promise<Item[]> {
    return await this.service.findFromUserId(user_id);
  }

  // `item`のURIへのPOSTメソッドでデータ新規登録．
  @Post()
  async addItem(@Body() item: CreateItemDTO): Promise<InsertResult> {
    return await this.service.create(item);
  }

  // `item/id番号`のURIへのGETメソッドでid指定で1件データ取得．
  // @Get(':id')
  // async getItem(@Param('id') id: string): Promise<Item> {
  //   return await this.service.find(Number(id));
  // }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() itemData: UpdateItemDTO,
  ): Promise<UpdateResult> {
    try {
      const newData = !itemData.finish
        ? itemData
        : {
            ...itemData,
            ...{ finish: itemData.finish.toLowerCase() === 'true' },
          };
      await this.service.update(Number(id), newData);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Incorrect user',
        },
        403,
      );
    }
    return;
  }

  @Post(':id/delete')
  async delete(
    @Param('id') id: string,
    @Body() formData: { user_id: string | null },
  ): Promise<DeleteResult> {
    try {
      await this.service.delete(Number(id), formData.user_id);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Incorrect user',
        },
        403,
      );
    }
    return;
  }
}
