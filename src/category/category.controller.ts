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
import {CategoryService} from "./category.service";
import {CategoryDto} from "./dto/category.dto";
import {GetAllDto} from "./dto/getAll.dto";
import {CategoryModel} from "./category.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('category')
export class CategoryController {


    constructor(private categoryService: CategoryService) {
    }




    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: CategoryDto ):Promise<number>{
        if(!dto.title){
            throw new HttpException({message: 'заполините обязательное поле'}, HttpStatus.BAD_REQUEST)
        }
            return this.categoryService.createCategory(dto)
    }



    @Get()
    getAll(@Query() dto:GetAllDto): Promise<CategoryModel[]>{
            return this.categoryService.getAllCategory(dto)
    }

    @Get('/:id')
    getOne(@Param('id') id:number):Promise<CategoryModel>{
            if(!id){
                throw new HttpException({message: 'Айди не получен'}, HttpStatus.BAD_REQUEST)
            }
            return this.categoryService.getOneCategory(id)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id:number){
        if(!id){
            throw new HttpException({message: 'Айди не получен'}, HttpStatus.BAD_REQUEST)
        }
        return this.categoryService.delete(id)
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    update(@Body() dto: CategoryDto, @Param('id') id:number ){
            if(!dto.title){
                throw new HttpException({message: 'заполините обязательное поле'}, HttpStatus.BAD_REQUEST)
            }
            return this.categoryService.updateCategory(dto, id)
    }

    @Get('/:id/product')
    getAllWithLink(@Param('id') id:number, @Query() dto: GetAllDto){
        if(!id){
            throw new HttpException({message: 'Айди не получен'}, HttpStatus.BAD_REQUEST)
        }
        return this.categoryService.getAllWithLinks(id, dto)

    }

}
