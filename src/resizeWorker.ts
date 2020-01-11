import { S3 } from 'aws-sdk';
import { GetObjectOutput, PutObjectOutput } from 'aws-sdk/clients/s3';
import Jimp from 'jimp';

const s3 = new S3();
const QUALITY_PERCENTATE = 100;

export const resize = async (bucketName: string, key: string, uploadsFolder: string, thumbnailsFolder: string) => {
    const newKey = replacePrefix(key, uploadsFolder, thumbnailsFolder);
    console.log('newKey:: ', newKey);
    const height = 512;
    return getS3Object(bucketName, key)
        .then((data) => resizer(data.Body as Buffer, height))
        .then((buffer) => putS3Object(bucketName, newKey, buffer));

};

const replacePrefix = (key: string, uploadsFolder: string, thumbnailsFolder: string): string => {
    const uploadPrefix = uploadsFolder;
    const thumbnailsPrefix = thumbnailsFolder;
    console.log(`key: ${key} -- uploadPrefix: ${uploadPrefix} -- thumbnailsPrefix: ${thumbnailsPrefix}`);
    return key.replace(uploadPrefix, thumbnailsPrefix);
};

const resizer = async (data: Buffer, height: number): Promise<Buffer> => {
    console.log('inside resizer', data);
    return Jimp.read(data)
        .then((image) =>
            image
                .resize(Jimp.AUTO, height)
                .quality(QUALITY_PERCENTATE)
                .getBufferAsync(Jimp.MIME_JPEG));
};

const getS3Object = (bucket: string, key: string): Promise<GetObjectOutput> =>
    s3.getObject({
        Bucket: bucket,
        Key: key,
        }).promise();

const putS3Object = (bucket: string, key: string, body: Buffer): Promise<PutObjectOutput> =>
    s3.putObject({
            Bucket: bucket,
            Key: key,
            Body: body,
            ContentType: 'image/jpeg',
        }).promise();
