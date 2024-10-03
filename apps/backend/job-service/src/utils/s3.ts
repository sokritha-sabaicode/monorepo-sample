import configs from "@/src/config";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: configs.s3Region,
  credentials: {
    accessKeyId: configs.awsAccessKeyId,
    secretAccessKey: configs.awsSecretAccessKey,
  },
});

export const uploadFile = async (
  file: Express.Multer.File
): Promise<string> => {
  const params = {
    Bucket: configs.s3Bucket,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);
  return `https://${configs.s3Bucket}.s3.amazonaws.com/${params.Key}`;
};

export const deleteFile = async (fileUrl: string): Promise<void> => {
  const key = fileUrl.split('/').slice(-1)[0]; // Extract the file key from the URL

  const params = {
    Bucket: configs.s3Bucket,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);
};