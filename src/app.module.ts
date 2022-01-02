import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configration from '../config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as ormconfig } from '../config/ormconfig';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { GroupProductsModule } from './group-products/group-products.module';
import { GroupsModule } from './groups/groups.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configration],
    }),
    TypeOrmModule.forRoot(ormconfig),
    ProductsModule,
    UsersModule,
    CategoriesModule,
    OrdersModule,
    GroupProductsModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
