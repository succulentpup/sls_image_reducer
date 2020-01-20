import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import status from 'statuses';

// todo: fix tsconfig.json to use paths properly
import { generateToken } from './auth/authoriser';
import { buildRespectObject } from './helpers/buildResponseObject';

const { APP_SECRET } = process.env;

interface InputObj {
    userName: string;
    secret: string;
}

export const authorizationHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  => {
    try {
        if (!event.body)
            return Promise.resolve(buildRespectObject(status('Bad Request'), { message: 'event body cant be empty' }));
        // tslint:disable-next-line no-unsafe-any
        const { userName, secret }: InputObj = JSON.parse(event.body);
        console.log(`userName: ${userName}, secret: ${secret}`);
        if (!userName || !secret)
            return Promise.resolve(buildRespectObject(status('Bad Request'), { message: 'userName or secret cant be empty' }));
        return Promise.resolve(buildRespectObject(status('OK'), { token: generateToken({ userName, secret }, APP_SECRET!) }));
    } catch (e) {
        return Promise.resolve(buildRespectObject(status('Bad Request'), { message: JSON.stringify(e) }));
    }
};
