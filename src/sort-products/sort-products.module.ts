import { Module } from '@nestjs/common';
import { SortProductsService } from './sort-products.service';

@Module({
  providers: [SortProductsService],
  exports: [SortProductsService]
})
export class SortProductsModule {}
