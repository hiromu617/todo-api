import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemDTO {
  // 空文字NG，string型指定
  @IsNotEmpty()
  @IsString()
  title: string;
}
