import { S3Client } from "@aws-sdk/client-s3";
type Operation = "PUT" | "GET";
export declare class PresignedURLService {
    s3Client: S3Client;
    private isNonEmptyString;
    getPresignedURL: (domain: string, // 폴더 이름
    operation: Operation, fileName: string, fileType: string) => Promise<string>;
}
export {};
//# sourceMappingURL=presignedURL.service.d.ts.map