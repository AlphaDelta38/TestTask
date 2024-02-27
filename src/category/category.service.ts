import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CategoryModel} from "./category.model";
import {CategoryDto} from "./dto/category.dto";
import {GetAllDto} from "./dto/getAll.dto";
import {ProductModel} from "../products/product.model";
import axios from "axios";
import {CurrencySwitchService} from "../currency-switch/currency-switch.service";
import {SortProductsService} from "../sort-products/sort-products.service";

@Injectable()
export class CategoryService {

    constructor(@InjectModel(CategoryModel) private categoryRepository: typeof  CategoryModel, @InjectModel(ProductModel) private productRepository: typeof ProductModel,private  currencyService: CurrencySwitchService , private sortingService: SortProductsService) {
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

        let foundProducts = await this.productRepository.findAll({where: {categoryId: foundCategory.id}, attributes: ['id', 'price','title', "mainPhoto", "createdAt" ], limit: DefaultLimit, offset: Page})

        if(dto.sortBy && dto.sortFor){
            let sortedProducts: ProductModel[]

            if(dto.sortBy === 'price'){
                if(dto.sortFor === 'up'){
                    sortedProducts = await this.sortingService.sortPriceUp(foundProducts)
                }else if(dto.sortFor === 'down'){
                    sortedProducts = await this.sortingService.sortPriceDown(foundProducts)
                }
            }else if(dto.sortBy === 'date'){
                if(dto.sortFor === 'up'){
                    sortedProducts = await this.sortingService.sortDateUp(foundProducts)
                }else if(dto.sortFor === 'down'){
                    sortedProducts = await this.sortingService.sortDateDown(foundProducts)
                }
            }

            if(dto.currency){
                sortedProducts = await this.currencyService.switchCurrrencyMassive(dto.currency , sortedProducts)
            }


            return [foundCategory,{products: sortedProducts}]

        }




        if(dto.currency){
            foundProducts = await this.currencyService.switchCurrrencyMassive(dto.currency, foundProducts)
        }

        return [foundCategory,{products: foundProducts}]


    }


}
