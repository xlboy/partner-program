import { UserPrivateKey } from 'app/constants/user';
import Userinfo from 'app/entities/userinfo.entity';
import jwt from 'jsonwebtoken'

interface UserinfoJWTFormat {
    username: string;
    id: number;
    date: number
}

export function generateUserJWT(
    userinfo: Pick<Userinfo, 'username' | 'id'>,
    expiresIn: string | number
): string {
    const { username, id } = userinfo
    const encryptionObj: UserinfoJWTFormat = {
        username,
        id,
        date: parseInt(String(+new Date() / 1000))
    }
    const tokenResult = jwt.sign(encryptionObj, UserPrivateKey, { expiresIn })
    return tokenResult
}

export function verifUserJWT(token: string): UserinfoJWTFormat | false {
    try {
        // jwt.verif验证token，如过期或token存在问题，则会直接进入catch处理异常错误
        return jwt.verify(token, UserPrivateKey) as UserinfoJWTFormat
    } catch (error) {
        return false
    }
}

export function getUserinfoJWTFormat(token: string): UserinfoJWTFormat {
    const userinfoJWT = verifUserJWT(token)
    if (userinfoJWT) {
        return userinfoJWT
    } else {
        throw 'getUserinfoJWTFormat -> error';
    }
}