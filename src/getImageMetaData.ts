import { APIGatewayProxyHandler } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import status from 'statuses';

const dynamoDB = new DocumentClient();
const WHITE_SPACES = 2;
const { META_TABLE_NAME } = process.env;

// TODO: for some reason when the path parameter (image name) is changed but using the same token, API gateway return 403. Need to investigate and fix this issue.
export const getImageMetaData: APIGatewayProxyHandler = async (event, _context) => {
    console.log(`Incoming event: ${JSON.stringify(event)}`);
    const imageId = `${event.pathParameters!.name}.jpg`;
    const params = {
        TableName : META_TABLE_NAME!, // todo: assert it through middleware
        Key: {
            imageId,
        },
    };

    try {
        const imageDetails = await dynamoDB.get(params).promise();
        console.log('imageDetails: ', JSON.stringify(imageDetails));
        if (Object.keys(imageDetails).length === 0) {
            return ({
                statusCode: status('404'),
                body: JSON.stringify({
                    message: `${imageId} metadata details are not found in the system`,
                    imageDetails,
                }, null, WHITE_SPACES),
            });
        }
        return ({
            statusCode: status('200'),
            body: JSON.stringify({
                message: `${imageId} metadata details are found in the system`,
                imageDetails,
            }, null, WHITE_SPACES),
        });
    } catch (e) {
        console.log('error whlie fetching meta data details for: ', imageId);
        return ({
            statusCode: status('404'),
            body: JSON.stringify({
                message: e,
            }, null, WHITE_SPACES),
        });
    }
};
