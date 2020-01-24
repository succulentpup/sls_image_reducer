import {
    CustomAuthorizerEvent,
    CustomAuthorizerHandler,
    CustomAuthorizerResult,
    PolicyDocument,
} from 'aws-lambda';
import * as jwt from 'jsonwebtoken';

const { APP_SECRET } = process.env;
export const generateToken = (jsonToSign: object, secret: string) => jwt.sign(jsonToSign || { }, secret);
const verifyToken = (token: string, secret: string) => jwt.verify(token, secret);
const buildPolicy = (effect: string, action: string, methodArn: string): PolicyDocument =>
    ({
        Version: '2012-10-17',
        Statement: [{
            Effect: effect,
            Action: action,
            Resource: methodArn,
        }],
    });

const generatePolicy = (action: string, methodArn: string): CustomAuthorizerResult => {
    const principalId = 'user';
    return {
        principalId,
        policyDocument: buildPolicy(action, 'execute-api:Invoke', methodArn),
    };
};

export const authorize: CustomAuthorizerHandler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
    console.log('event: ', JSON.stringify(event));
    try {
        if (verifyToken(event.authorizationToken!, APP_SECRET!))
            return Promise.resolve(generatePolicy('Allow', event.methodArn));
        return Promise.resolve(generatePolicy('Deny', event.methodArn));
    } catch (e) {
        console.log('something went wrong, send a policy that denies everything');
        return Promise.resolve(generatePolicy('Deny', event.methodArn));
    }
} ;
