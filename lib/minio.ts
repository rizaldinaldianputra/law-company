import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

const BUCKET_NAME = process.env.MINIO_BUCKET || 'lawfirm';

export async function ensureBucketExists() {
  const exists = await minioClient.bucketExists(BUCKET_NAME);
  if (!exists) {
    await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
  }

  // Always set bucket policy to ensure public read access
  const policy = {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: { AWS: ['*'] },
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
      },
    ],
  };
  await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
}

export async function listAllObjects() {
  await ensureBucketExists();
  return new Promise<any[]>((resolve, reject) => {
    const stream = minioClient.listObjectsV2(BUCKET_NAME, '', true);
    const objects: any[] = [];
    stream.on('data', (obj) => objects.push(obj));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(objects));
  });
}

export async function uploadFile(file: File): Promise<string> {
  await ensureBucketExists();

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  
  await minioClient.putObject(
    BUCKET_NAME,
    fileName,
    buffer,
    buffer.length,
    { 'Content-Type': file.type }
  );

  // Return the public URL
  // If running locally with Docker, this might need to use the PUBLIC_MINIO_URL
  const baseUrl = process.env.NEXT_PUBLIC_MINIO_URL || `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`;
  return `${baseUrl}/${BUCKET_NAME}/${fileName}`;
}

export default minioClient;
