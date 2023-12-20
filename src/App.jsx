import ScratchCard from "./ScratchCard";
import { useWindowSize } from "./hooks/useWindowSize";

import scratchMe from "./assets/scratchMe.webp";
import { useState } from "react";

function App() {
  const [scratchedPercent, setScratchedPercent] = useState(100);
  const { width, height } = useWindowSize();

  // Ensure square aspect ratio for canvas
  let canvasSize;
  if (width < 768) {
    // Assuming mobile screen width as 768px, adjust as needed
    canvasSize = Math.min(width, height) - 100;
  } else {
    canvasSize = Math.min(width, height) - 300;
  }

  // Adjust canvas size based on window size
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen gap-8">
      <h1 className="text-2xl text-indigo-700">Merry Christhus</h1>
      <ScratchCard
        width={canvasSize}
        height={canvasSize}
        image={scratchMe}
        brushSize={20}
        setScratchedPercent={setScratchedPercent}
      />
      <h2 className="font-sans text-sm font-bold text-indigo-600">
        {scratchedPercent.toFixed(0)}%
      </h2>
      <div className="w-full h-24 mb-4 overflow-hidden">
        {scratchedPercent < 15 && (
          <>
            <h2 className="text-base text-center animate-fadeIn">
              Rendez vous le 23 Mars avec la personne de ton choix
            </h2>
            <p className="text-base text-center opacity-0 animate-fadeInDelayed">
              pour siffler Julien.
            </p>
            <p className="text-base text-center opacity-0 animate-fadeInDelayed2">
              Joyeux Noel 🎄
            </p>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
