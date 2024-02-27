import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {SequelizeModule} from "@nestjs/sequelize";
import { ProductsModule } from './products/products.module';
import {ProductModel} from "./products/product.model";
import { SortProductsModule } from './sort-products/sort-products.module';
import { CategoryModule } from './category/category.module';
import {CategoryModel} from "./category/category.model";



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
          ProductModel,
          CategoryModel,
      ],
      autoLoadModels: true,
    }),
    ProductsModule,
    SortProductsModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
