import { Injectable } from '@nestjs/common';
import {ProductModel} from "../products/product.model";

@Injectable()
export class SortProductsService {


    async sortPriceUp(products: ProductModel[]){


        const sorted = products.sort((a, b) => b.price - a.price);

        return sorted.reverse()

    }


    async sortPriceDown(products: ProductModel[]){
        const sorted = products.sort((a, b) => b.price - a.price);

        return sorted
    }

    async sortDateUp(products: ProductModel[]){


        const sorted = products.sort((a, b) => b.createdAt - a.createdAt);

        return sorted.reverse()

    }


    async sortDateDown(products: ProductModel[]){
        const sorted = products.sort((a, b) =>  b.createdAt - a.createdAt);

        return sorted
    }





}
