export interface ExtraOptions {
  uploadFile?: boolean;
  keepalive?: boolean;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  onDownloadProgress?: (progressEvent: ProgressEvent) => void;
}
