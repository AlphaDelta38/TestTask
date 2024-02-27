import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {CategoryModel} from "./category.model";
import {ProductModel} from "../products/product.model";
import {CurrencySwitchModule} from "../currency-switch/currency-switch.module";
import {SortProductsModule} from "../sort-products/sort-products.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      SequelizeModule.forFeature([
          CategoryModel,
          ProductModel,
      ]),
      CurrencySwitchModule,
      SortProductsModule,
      AuthModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
