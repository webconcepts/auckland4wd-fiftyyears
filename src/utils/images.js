
export function imageSrc(albumId, photoId, width, height, crop = '') {
  const resize = `${width}x${height}${crop}`;
  const filePath = `${process.env.REACT_APP_S3_KEY_PREFIX}/${albumId}/${photoId}`;

  return `${process.env.REACT_APP_S3_URL}${resize}/${filePath}`;
}
