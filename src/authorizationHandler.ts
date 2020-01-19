import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import * as jwt from 'jsonwebtoken';
import status from 'statuses';

// todo: fix tsconfig.json to use paths properly
import { buildRespectObject } from './@helpers/buildResponseObject';
const { APP_SECRET } = process.env;

const generateToken = (jsonToSign: string | null) => jwt.sign(jsonToSign || { }, APP_SECRET!);
export const authorizationHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  =>
    Promise.resolve(buildRespectObject(status('OK'), { token: generateToken(event.body) }));
