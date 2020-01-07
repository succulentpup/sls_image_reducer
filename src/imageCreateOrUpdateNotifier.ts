import { S3Handler } from 'aws-lambda';

export const imageCreateOrUpdateNotifier: S3Handler  = (event) => {
    console.log('event: ', JSON.stringify(event));
    };
