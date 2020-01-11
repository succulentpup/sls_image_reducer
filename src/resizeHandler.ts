import { S3Handler } from 'aws-lambda';

import { resize } from './resizeWorker';

const { UPLOADS_FOLDER, THUMBNAILS_FOLDER } = process.env;

export const resizeHandler: S3Handler  = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;
    // todo: assert environment variables
    // if (!UPLOADS_FOLDER || !THUMBNAILS_FOLDER) return new Error('Either UPLOADS_FOLDER or THUMBNAILS_FOLDER is missed');
    await resize(bucket, key, UPLOADS_FOLDER as string, THUMBNAILS_FOLDER as string);
    };
