import * as jwt from 'jsonwebtoken';

export const generateToken = (jsonToSign: string | null, secret: string) => jwt.sign(jsonToSign || { }, secret);
