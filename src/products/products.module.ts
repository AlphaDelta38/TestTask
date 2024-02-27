import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ProductModel} from "./product.model";
import {SortProductsModule} from "../sort-products/sort-products.module";
import {CurrencySwitchModule} from "../currency-switch/currency-switch.module";

@Module({
  imports: [
      SequelizeModule.forFeature([
          ProductModel,
      ]),
      SortProductsModule,
      CurrencySwitchModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
