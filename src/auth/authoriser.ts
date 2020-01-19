import {
    CustomAuthorizerEvent,
    CustomAuthorizerHandler,
    CustomAuthorizerResult,
    PolicyDocument,
} from 'aws-lambda';
import * as jwt from 'jsonwebtoken';

const { APP_SECRET } = process.env;
export const generateToken = (jsonToSign: string | null, secret: string) => jwt.sign(jsonToSign || { }, secret);
const verifyToken = (token: string, secret: string) => jwt.verify(token, secret);
const buildPolicy = (effect: string, action: string, methodArn: string): PolicyDocument =>
    ({
        Version: 'a1',
        Statement: [{
            Effect: effect,
            Action: action,
            Resource: methodArn,
        }],
    });

const generatePolicy = (token: string, methodArn: string): CustomAuthorizerResult => {
    if (verifyToken(token, APP_SECRET!)) {
        return {
            principalId: 'abc',
            // todo: send correct parameters to buildPolicy
            policyDocument: buildPolicy('DENY', '*', methodArn),
        };
    }
    console.log(`invalid token: send user friendly error message`);
    return {
        principalId: 'abc',
        policyDocument: buildPolicy('DENY', '*', methodArn),
    };
};

export const authorize: CustomAuthorizerHandler = (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
    try {
        return Promise.resolve(generatePolicy(event.authorizationToken!, event.methodArn));
    } catch (e) {
        // todo: something is wrong, send a policy that denies anything
        return Promise.resolve(generatePolicy(event.authorizationToken!, event.methodArn));
    }
} ;
