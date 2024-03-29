import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {ProductsDto} from "./dto/products.dto";
import {QueryParametrsDto} from "./dto/queryParametrs.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('product')
export class ProductsController {

    constructor(private productsSerivce: ProductsService) {
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: ProductsDto ){
            if(!dto.title || !dto.description || !dto.categoryId || !dto.currency || !dto.photos || !dto.mainPhoto || !dto.price){
                throw new HttpException({message: 'fill the filed correctly'}, HttpStatus.BAD_REQUEST)
            }
            return this.productsSerivce.createProduct(dto)
    }


    @Get()
    getAll(@Query() dto: QueryParametrsDto){
        return this.productsSerivce.getAllProducts(dto)
    }


    @Get('/:id')
    getOne(@Param('id') id: number, @Query('currency') currency: string){
        if(!id){
            throw new HttpException({message: 'укажите айди'}, HttpStatus.BAD_REQUEST)
        }
        return this.productsSerivce.getOneProduct(id, currency)
    }


    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id: number){
        if(!id){
            throw new HttpException({message: 'укажите айди'}, HttpStatus.BAD_REQUEST)
        }
        return this.productsSerivce.deleteProduct(id)
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: number, @Body() dto: ProductsDto){
        if(!id){
            throw new HttpException({message: 'укажите айди'}, HttpStatus.BAD_REQUEST)
        }
        return this.productsSerivce.updateProduct(id, dto)
    }

}
