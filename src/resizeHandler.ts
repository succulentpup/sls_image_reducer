import { S3Handler } from 'aws-lambda';

import { resize } from './resizeWorker';

export const resizeHandler: S3Handler  = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;
    await resize(bucket, key);
    };
