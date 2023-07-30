import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isObjectIdOrHexString, Types } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any): Types.ObjectId {
    if (!isObjectIdOrHexString(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return new Types.ObjectId(value);
  }
}
