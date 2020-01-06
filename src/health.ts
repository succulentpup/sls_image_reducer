import { APIGatewayProxyHandler } from 'aws-lambda';

const HTTP_SUCCESS = 200; // TODO: import HTTP STATUS CODES Module
const WHITE_SPACES = 2;
export const health: APIGatewayProxyHandler = async (event, _context) =>
    ({
    statusCode: HTTP_SUCCESS,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.1! Your function executed successfully!',
      input: event,
    }, null, WHITE_SPACES),
  });
