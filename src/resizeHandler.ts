import { S3Handler } from 'aws-lambda';

import { saveImageMetadata } from './crud/saveImageMetadata';
import { resize } from './resizeWorker';

const { UPLOADS_FOLDER, THUMBNAILS_FOLDER, META_TABLE_NAME } = process.env;

export const resizeHandler: S3Handler  = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;
    // todo: assert environment variables
    // if (!UPLOADS_FOLDER || !THUMBNAILS_FOLDER) return new Error('Either UPLOADS_FOLDER or THUMBNAILS_FOLDER is missed');
    try {
        await resize(bucket, key, UPLOADS_FOLDER as string, THUMBNAILS_FOLDER as string)
            .then(() => saveImageMetadata(bucket, key, META_TABLE_NAME))
            .then((res) => console.log('res: ', res))
            .catch((e) => console.log('error: ', JSON.stringify(e)));
    } catch (e) {
        console.log('Error: ', e);
    }
};
