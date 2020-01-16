import { AWSError, S3 } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';

const s3 = new S3();
const dynamoDB = new DocumentClient();
interface ImageMetadataRecord {
   imageId: string;
   key: string;
   bucket: string;
   imageUrl: string;
   thumbnails: [string] | [];
   isAThumbnail: boolean;
}

const getFileName = (key: string, isAThumbnail: boolean) => {
   const stringArray = key.split('/');
   const fileName = stringArray[1];
   if (isAThumbnail)
       return `${fileName}_thumbnail`;
   return fileName;
};

const getSignedUrl = (Bucket: string, Key: string) => s3.getSignedUrl('getObject', { Bucket, Key });

export const saveImageMetadata = async (bucket: string, key: string, metaTableName, isAThumbnail = false): Promise<PromiseResult<DocumentClient.PutItemOutput, AWSError>> => {
    const image: ImageMetadataRecord | never = { imageId: '', key: '', bucket: '', imageUrl: '', thumbnails: [], isAThumbnail };
    image.imageId = getFileName(key, isAThumbnail);
    image.key = key;
    image.bucket = bucket;
    image.imageUrl = getSignedUrl(bucket, key);
    image.thumbnails = [];
    image.isAThumbnail = isAThumbnail;

    const dynamoDBParams = {
        TableName: metaTableName,
        Item: image,
    };

    return dynamoDB.put(dynamoDBParams).promise();
};
