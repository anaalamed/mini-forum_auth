import * as jwt from 'jsonwebtoken';
import { COOKIE_SECRET } from '../config';




export const signToken = (data) => {
    return jwt.sign( {data}, COOKIE_SECRET, { expiresIn: '30d' })
}


export const verifyToken = (token) => {
    return jwt.verify( token , COOKIE_SECRET ).data;
}