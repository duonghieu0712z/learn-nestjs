import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty()
  data: T | null;

  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string | string[];

  constructor(data: T, status: number, message: string | string[]) {
    this.data = data ?? null;
    this.status = status;
    this.message = message;
  }
}
