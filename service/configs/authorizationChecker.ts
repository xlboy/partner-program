import { Action } from "routing-controllers";

export default function (action: Action, roles: any[]): Promise<boolean> | boolean {
    action.response.body = { code: 2 }
    // console.log('action.response', action.response.body = )
    return true
}
