import {BelongsTo, Column, DataType, Model, Table} from "sequelize-typescript";
import {CategoryModel} from "../category/category.model";


interface ProductInerface{
    price: number
    title: string
    description: string
    mainPhoto: string
    photos: string[]
    categoryId: number
}


@Table({tableName: 'products'})
export class ProductModel extends Model<ProductModel,ProductInerface>{
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true })
    id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number

    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @Column({type: DataType.STRING, allowNull: false})
    mainPhoto: string

    @Column({type: DataType.ARRAY(DataType.STRING), allowNull: false})
    photos: string[]

    @Column({type: DataType.STRING, defaultValue: 'UAH', allowNull: true})
    currency: string

    @Column({type: DataType.INTEGER, allowNull: false})
    categoryId: number


    @BelongsTo(()=>CategoryModel, {foreignKey: 'categoryId'})
    category: CategoryModel

}