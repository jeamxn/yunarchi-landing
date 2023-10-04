import imageCompression from "browser-image-compression";

const convertBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    const options = {
      maxSizeMB: 0.1,
      useWebWorker: true,
    };
    
    imageCompression(file, options).then((compressedFile) => {
      fileReader.readAsDataURL(compressedFile);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  });
};

export default convertBase64;