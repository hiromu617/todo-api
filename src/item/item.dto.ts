import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateItemDTO {
  // 空文字NG，string型指定
  @IsNotEmpty()
  @IsString()
  title: string;
}
export class FindItemDTO {
  // 空文字NG，string型指定
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class UpdateItemDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  finish: string;
}
