import authorization from './authorization'
import fileVerif from './fileVerif'
import { Router } from '../../@types/sys.type';
import { Request, Response } from 'koa';

type ValidationTypeObj = {
    [key in Router.ValidationType]: (context: any, next: (err?: any) => Promise<any>) => any;
};

const validationType: ValidationTypeObj = {
    [Router.ValidationType.USER_AUTHORIZE]: authorization,
    [Router.ValidationType.FILE_IMG]: fileVerif,
    [Router.ValidationType.FILE_EXECL]: fileVerif
}

type ValidationTypeKey = keyof typeof Router.ValidationType
export default function(...keys: ValidationTypeKey[]) {
    return keys.map(key => validationType[key])
} 