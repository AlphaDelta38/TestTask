import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CategoryModel} from "./category.model";
import {CategoryDto} from "./dto/category.dto";
import {GetAllDto} from "./dto/getAll.dto";
import {skip} from "rxjs";
import {ProductModel} from "../products/product.model";

@Injectable()
export class CategoryService {

    constructor(@InjectModel(CategoryModel) private categoryRepository: typeof  CategoryModel, @InjectModel(ProductModel) private productRepository: typeof ProductModel ) {
    }

    async createCategory(dto: CategoryDto){
        const createdCategory:CategoryModel = await this.categoryRepository.create(dto)
        return createdCategory.id
    }


    async getAllCategory(dto:GetAllDto){
        let DefaultLimit = 10
        let DefaultPage  = 1

        if(dto.limit){
            DefaultLimit = dto.limit

        }
        if(dto.page){
            DefaultPage = dto.page
        }

        let Page = DefaultPage * DefaultLimit - DefaultLimit
        return await  this.categoryRepository.findAll({limit: DefaultLimit, offset: Page})
    }

    async  getOneCategory(id:number){
            return await  this.categoryRepository.findByPk(id)
    }

    async delete(id: number){
        return this.categoryRepository.destroy({where: {id: id}})
    }


    async updateCategory(dto : CategoryDto, id:number){
        return await  this.categoryRepository.update({...dto}, {where: {id: id}})
    }


    async  getAllWithLinks(id:number, dto: GetAllDto){
        let DefaultLimit = 10
        let DefaultPage  = 1

        if(dto.limit){
            DefaultLimit = dto.limit

        }
        if(dto.page){
            DefaultPage = dto.page
        }

        let Page = DefaultPage * DefaultLimit - DefaultLimit

        const foundCategory = await  this.categoryRepository.findOne({where: {id: id} })

        if(!foundCategory){
            throw new HttpException({message: 'Категория не найдена'}, HttpStatus.BAD_REQUEST)
        }

        const foundProducts = await this.productRepository.findAll({where: {categoryId: foundCategory.id}, attributes: ['id', 'price','title', "mainPhoto", "createdAt" ], limit: DefaultLimit, offset: Page})


        return [foundCategory,{products: foundProducts}]




    }


}
