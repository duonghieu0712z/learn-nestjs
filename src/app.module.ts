import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import configuration from './config/configuration';
import { ExceptionHandlerFilter } from './filters/exception-handler/exception-handler.filter';
import { ResponseHandlerInterceptor } from './interceptors/response-handler/response-handler.interceptor';
import { ProductModule } from './product/product.module';

import paginate = require('mongoose-paginate-v2');

@Module({
  providers: [
    { provide: APP_FILTER, useClass: ExceptionHandlerFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseHandlerInterceptor },
  ],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(configuration().mongoUri + configuration().dbName, {
      connectionFactory(connection) {
        connection.plugin(paginate);
        return connection;
      },
    }),
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}
