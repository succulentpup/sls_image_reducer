import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import status from 'statuses';

// todo: fix tsconfig.json to use paths properly
import { generateToken } from './auth/authoriser';
import { buildRespectObject } from './helpers/buildResponseObject';

const { APP_SECRET } = process.env;

export const authorizationHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  => {
    try {
        return Promise.resolve(buildRespectObject(status('OK'), { token: generateToken(event.body, APP_SECRET!) }));
    } catch (e) {
       return Promise.resolve(buildRespectObject(status('Bad Request'), e));
    }
};
