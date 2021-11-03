import { Injectable } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDTO, FindItemDTO } from './item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findFromUserId(userId: string): Promise<Item[]> {
    return await this.itemRepository.find({ where: { user_id: userId } });
  }

  // テーブルにアイテムを追加する関数を定義
  async create(item: CreateItemDTO): Promise<InsertResult> {
    return await this.itemRepository.insert(item);
  }

  // idを指定してテーブルから1件のデータを取得する関数を定義
  async find(id: number): Promise<Item> | null {
    return await this.itemRepository.findOne({ id: id });
  }

  // idを指定してテーブルのデータを更新する関数を定義
  async update(id: number, newData): Promise<UpdateResult> {
    const item = await this.find(Number(id));

    // userIdが一致するかバリデーション
    if (item.user_id !== newData.user_id) {
      return Promise.reject(new Error('Incorrect user'));
    }

    return await this.itemRepository.update(id, newData);
  }

  //  idを指定してテーブルのデータを削除する関数を定義
  async delete(id: number): Promise<DeleteResult> {
    return await this.itemRepository.delete(id);
  }
}
