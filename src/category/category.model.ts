import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ProductModel} from "../products/product.model";


interface CategoriesInterface{
    title: string
}


@Table({tableName: 'categories'})
export class CategoryModel extends Model<CategoryModel,CategoriesInterface>{
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true })
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    title: string


    @HasMany(()=>ProductModel, {foreignKey: 'categoryId'})
    products: ProductModel[]

}