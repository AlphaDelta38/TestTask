import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import axios from "axios";
import {ProductModel} from "../products/product.model";

@Injectable()
export class CurrencySwitchService {


    async switchCurrrencyMassive(currency: string, massive){
        try {
            const response = await axios.get('https://api.monobank.ua/bank/currency')
            if(currency === 'USD'){
                const rateObject = response.data.filter((value)=>value.currencyCodeB === 980 && value.currencyCodeA === 840);
                for (let i = 0; i < massive.length; i++) {
                    let finallyPrice = massive[i].price/rateObject[0].rateSell
                    massive[i].price = finallyPrice
                }
                return massive
            }
            if(currency === 'EUR'){
                const rateObject = response.data.filter((value)=>value.currencyCodeB === 980 && value.currencyCodeA === 978);
                for (let i = 0; i < massive.length; i++) {
                    let finallyPrice = massive[i].price/rateObject[0].rateSell
                    massive[i].price = finallyPrice
                }
                return massive
            }




        }catch (e) {
            throw new HttpException({message: 'Проблемы получения валют'}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async switchCurrrencyOne(currency: string, one:ProductModel){
        try {
            const response = await axios.get('https://api.monobank.ua/bank/currency')
            if(currency === 'USD'){
                const rateObject = response.data.filter((value)=>value.currencyCodeB === 980 && value.currencyCodeA === 840);
                let finallyPrice = one.price/rateObject[0].rateSell
                let objectOne = one.price = finallyPrice
                return one
            }
            if(currency === 'EUR'){
                const rateObject = response.data.filter((value)=>value.currencyCodeB === 980 && value.currencyCodeA === 978);
                let finallyPrice = one.price/rateObject[0].rateSell
                let objectOne = one.price = finallyPrice
                return one
            }




        }catch (e) {
            throw new HttpException({message: 'Проблемы получения валют'}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }







}
