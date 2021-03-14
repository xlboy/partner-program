import { secretOrPrivateKey } from 'app/constants/user';
import jwt from 'jsonwebtoken'


jwt.sign({ foo: 'bar' }, secretOrPrivateKey);