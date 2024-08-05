export async function imageUrlToBase64(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // This is important for cross-origin images
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
  
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          const base64 = dataUrl.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to get 2D context'));
        }
      };
  
      img.onerror = (error) => {
        reject(new Error(`Failed to load image: ${error}`));
      };
  
      img.src = imageUrl;
    });
  }