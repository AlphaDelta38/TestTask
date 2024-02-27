import {BelongsTo, Column, DataType, Model, Table} from "sequelize-typescript";
import {CategoryModel} from "../category/category.model";

interface  UserInterface{
    email: string
    password: string
    role: string
}
@Table({tableName: 'user'})
export class UserModel extends Model<UserModel,UserInterface>{
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true })
    id: number


    @Column({type: DataType.STRING, allowNull: false, unique: true})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @Column({type: DataType.STRING, allowNull: true})
    role: string



}