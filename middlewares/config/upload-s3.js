//import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');

var AWS = require("aws-sdk");

exports.uploadFileS3 = async (bucketName, path, file) => {
    //export const uploadFileS3 = async (bucketName, path, file) => {
    const s3Config = {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
        region: "sa-east-1",
    };

    const s3Client = new S3Client(s3Config);

    const commandS3 = new PutObjectCommand({
        Bucket: bucketName,
        Key: path,
        Body: file,
        ServerSideEncryption: "AES256",
    });

    try {
        const response = await s3Client.send(commandS3);
        return (response);
    } catch (err) {
        return (err)
    }
};

