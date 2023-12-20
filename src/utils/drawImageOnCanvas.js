export const drawImageOnCanvas = async (canvas, image, setReady ) => {

  const context = canvas.getContext("2d");
 const loadCanvasImage = () => {
   const aspectRatio = image.width / image.height;
   let drawWidth, drawHeight, xOffset, yOffset;

   if (aspectRatio > 1) {
     drawWidth = canvas.width;
     drawHeight = canvas.width / aspectRatio;
     xOffset = 0;
     yOffset = (canvas.height - drawHeight) / 2;
   } else {
     drawWidth = canvas.height * aspectRatio;
     drawHeight = canvas.height;
     xOffset = (canvas.width - drawWidth) / 2;
     yOffset = 0;
   }

   context.clearRect(0, 0, canvas.width, canvas.height);
   context.drawImage(image, xOffset, yOffset, drawWidth, drawHeight);
   context.globalCompositeOperation = "destination-out";

   setReady(true); // Mark the canvas as ready after the image is loaded
 };

 if (image.complete) {
   loadCanvasImage();
 } else {
   image.onload = loadCanvasImage;
 }
};
