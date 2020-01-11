import { S3Handler } from 'aws-lambda';

export const thumbnailsDetails: S3Handler  = (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;
    console.log(`bucket: ${bucket} -- key: ${key}`);
};
