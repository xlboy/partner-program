import { UserPrivateKey  } from 'app/constants/user';
import jwt from 'jsonwebtoken'


jwt.sign({ foo: 'bar' }, UserPrivateKey );