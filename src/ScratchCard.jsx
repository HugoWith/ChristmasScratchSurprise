import { useRef, useEffect, useState, useCallback } from "react";
import { drawImageOnCanvas } from "./utils/drawImageOnCanvas";

import YouTube from "react-youtube";

const ScratchCard = ({
  width,
  height,
  image,
  brushSize,
  setScratchedPercent,
}) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);

  const [isScratching, setIsScratching] = useState(false);
  // const [scratchedPercent, setScratchedPercent] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    drawImageOnCanvas(canvas, image, setReady);
  }, [width, height, imageRef]);

  const handleStartScratching = () => {
    setIsScratching(true);
  };

  const handleStopScratching = () => {
    setIsScratching(false);
  };

  const calculateScratchedPercent = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const pixels = context.getImageData(0, 0, width, height).data;
    const totalPixels = width * height;
    let scratchedPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        scratchedPixels++;
      }
    }

    setScratchedPercent(100 - (scratchedPixels / totalPixels) * 100);
  }, [width, height, setScratchedPercent]);

  const scratch = (e) => {
    if (isScratching) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      let x, y;
      if (
        e.type === "mousemove" ||
        e.type === "mousedown" ||
        e.type === "mouseup"
      ) {
        const rect = canvas.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      } else if (
        e.type === "touchmove" ||
        e.type === "touchstart" ||
        e.type === "touchend"
      ) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
      }

      context.beginPath();
      context.arc(x, y, brushSize, 0, Math.PI * 2, true);
      context.fill();

      calculateScratchedPercent();
    }
  };

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-lg"
      style={{ width: width, height: height }}
    >
      {ready && (
        <YouTube
          ref={videoRef}
          videoId={"ednqyvwzeyQ"}
          opts={{
            width: width.toString(),
            height: height.toString(),
            playerVars: {
              autoplay: 1,
              controls: 0,
              loop: 1,
              modestbranding: 1,
              mute: 1,
            },
          }}
          onReady={(event) => console.log(event)}
          className="absolute inset-0 -z-10 rounded-lg "
        />
      )}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleStartScratching}
        onMouseMove={scratch}
        onMouseUp={handleStopScratching}
        onTouchStart={handleStartScratching}
        onTouchMove={scratch}
        onTouchEnd={handleStopScratching}
        className="absolute inset-0 z-10 rounded-lg shadow-lg"
      />
      <img
        ref={imageRef}
        src={image}
        alt="hidden"
        className="hidden"
        style={{ display: "none" }}
      />

      {/* <p>{scratchedPercent.toFixed(2)}% scratched</p> */}
    </div>
  );
};

export default ScratchCard;
