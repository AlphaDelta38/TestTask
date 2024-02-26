import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ProductModel} from "./product.model";
import {ProductsDto} from "./dto/products.dto";
import * as path from "path";
import * as fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import {QueryParametrsDto} from "./dto/queryParametrs.dto";
import {SortProductsService} from "../sort-products/sort-products.service";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(ProductModel) private productsRepository: typeof ProductModel, private sortingService: SortProductsService) {
    }

    async createProduct(dto: ProductsDto): Promise<Number> {

        const id = uuidv4()
        const fileName = `${id}.txt`
        const pathDescription = path.resolve(process.cwd(), 'src', 'products', 'description', `${fileName}`)
        const directoryPath = path.resolve(process.cwd(), 'src', 'products', 'description');

        try {

            // Проверка и создание директории
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, {recursive: true});
            }

            // Запись в файл
            if (dto.description) {
                await fs.promises.writeFile(pathDescription, dto.description);
            }

            const createdProduct: ProductModel = await this.productsRepository.create({...dto, description: fileName})
            return createdProduct.id
        } catch (e) {
            throw new HttpException({message: 'ошибка записи файла'}, HttpStatus.INTERNAL_SERVER_ERROR)
        }


    }



    async getAllProducts(dto: QueryParametrsDto){
            let DefaultLimit = 10
            let DefaultPage  = 1

            if(dto.limit){
                DefaultLimit = dto.limit

            }
            if(dto.page){
                DefaultPage = dto.page
            }

             let Page = DefaultPage * DefaultLimit - DefaultLimit

            const products = await  this.productsRepository.findAll({limit: DefaultLimit, offset: Page ,  attributes: ['id', 'price','title', "mainPhoto", "createdAt" ]})
            if(!products){
                throw new HttpException({message: 'товары не найдены'}, HttpStatus.NOT_FOUND)
            }



            let sortedProducts: ProductModel[]

            if(dto.sortBy === 'price'){
                if(dto.sortFor === 'up'){
                    sortedProducts = await this.sortingService.sortPriceUp(products)
                }else if(dto.sortFor === 'down'){
                    sortedProducts = await this.sortingService.sortPriceDown(products)
                }
            }else if(dto.sortBy === 'date'){
                if(dto.sortFor === 'up'){
                    sortedProducts = await this.sortingService.sortDateUp(products)
                }else if(dto.sortFor === 'down'){
                    sortedProducts = await this.sortingService.sortDateDown(products)
                }
            }


            return sortedProducts
    }


    async getOneProduct(id:number){
            const foundOne = await this.productsRepository.findByPk(id)
            const filePath = path.resolve(process.cwd(), 'src', 'products', 'description', `${foundOne.description}`)
            const description = fs.readFileSync(filePath, 'utf8',)

            if(!foundOne){
                throw new HttpException({message: 'Данный товар не найден'}, HttpStatus.BAD_REQUEST)
            }
            foundOne.description = description
            return foundOne
    }

    async deleteProduct(id:number){
        return this.productsRepository.destroy({where: {id: id}})
    }


    async updateProduct(id:number,dto: ProductsDto){
        const foundProduct = await this.productsRepository.findByPk(id)
        let filename = foundProduct.description


        const pathDescription = path.resolve(process.cwd(), 'src', 'products', 'description', `${filename}`)
        if (dto.description) {
            await fs.promises.writeFile(pathDescription, dto.description);
        }

       return await this.productsRepository.update({...dto, description: filename}, {where: {id: id}, returning: true})
    }



}