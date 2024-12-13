import { Photo } from "@/types/client";

interface ImageDimension {
  width: number;
  height: number;
}

interface ImageConverterConfig {
  maxWidth: number;
  maxHeight: number;
  quality: number;
}

/**
 * 원본 이미지의 종횡비를 유지하면서 최대 허용 크기 조정
 * @param original - 원본 이미지 크기
 * @param max - 최대 허용 크기
 * @returns 조정된 이미지 크기
 */
const calculateAspectRatio = (
  original: ImageDimension,
  max: ImageDimension
): ImageDimension => {
  let { width, height } = original;

  if (width > max.width) {
    height = (height * max.width) / width;
    width = max.width;
  }

  if (height > max.height) {
    width = (width * max.height) / height;
    height = max.height;
  }

  return {
    width: Math.floor(width),
    height: Math.floor(height),
  };
};

/**
 * 지정된 크기의 Canvas 엘리먼트 생성
 * @param dimension - Canvas 크기
 * @returns HTMLCanvasElement
 */
const createCanvas = (dimension: ImageDimension): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = dimension.width;
  canvas.height = dimension.height;
  return canvas;
};

/**
 * Canvas에 이미지를 그림
 * @param canvas - 대상 Canvas 엘리먼트
 * @param image - 그릴 이미지
 * @throws Canvas context를 얻을 수 없는 경우
 * @returns 이미지가 그려진 Canvas
 */
const drawImageToCanvas = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement
): HTMLCanvasElement | never => {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
};


//TODO : 서버 정책으로 인한 avif ,webp 등 400에러 
//code : 504 , message : 이미지 파일만 업로드 가능합니다.

/**
 * Canvas를 WebP 형식으로 변환
 * @param canvas - 변환할 Canvas
 * @param fileName - 원본 파일 이름
 * @param quality - 압축 품질 (0~1)
 * @returns Promise<Photo>
 */
const canvasToWebP = (
  canvas: HTMLCanvasElement,
  fileName: string,
  quality: number
): Promise<Photo> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Blob creation failed"));
          return;
        }

        const webpFile = new File(
          [blob],
          fileName.replace(/\.[^/.]+$/, ".jpeg"),
          {
            type: "image/jpeg",
          }
        );
        const webpUrl = URL.createObjectURL(blob);

        resolve({
          file: webpFile,
          url: webpUrl,
        });
      },
      "image/jpeg",
      quality
    );
  });

const loadImage = (objectUrl: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image loading failed"));
    img.src = objectUrl;
  });

/**
 * File 객체를 Data URL로 변환
 * @param file - 변환할 File 객체
 * @returns Promise<string>
 */
const fileToObjectUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error("File reading failed"));
    reader.readAsDataURL(file);
  });

/**
 * 이미지 파일을 WebP 형식으로 변환
 * 
 * @param file - 변환할 이미지 파일
 * @param config - 변환 설정
 * @param config.maxWidth - 최대 허용 너비
 * @param config.maxHeight - 최대 허용 높이
 * @param config.quality - 압축 품질 (0~1)
 *
 * @returns Promise<Photo> - 변환된 이미지 정보
 * @throws {Error} 이미지 로드 실패, Canvas 생성 실패 등의 경우
 *
 * @example
 * const optimizedImage = await convertToWebP(file, {
 *   maxWidth: 1920,
 *   maxHeight: 1080,
 *   quality: 0.8
 * });
 */
const convertToWebP = async (
  file: File,
  config: ImageConverterConfig
): Promise<Photo> => {
  const objectUrl = await fileToObjectUrl(file);
  const image = await loadImage(objectUrl);

  const dimension = calculateAspectRatio(
    { width: image.width, height: image.height },
    { width: config.maxWidth, height: config.maxHeight }
  );

  const canvas = createCanvas(dimension);
  const drawnCanvas = drawImageToCanvas(canvas, image);
  const webpImage = await canvasToWebP(drawnCanvas, file.name, config.quality);

  URL.revokeObjectURL(objectUrl);
  return webpImage;
};

export { convertToWebP };
