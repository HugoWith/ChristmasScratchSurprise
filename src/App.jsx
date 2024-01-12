import ScratchCard from "./ScratchCard";
import { useWindowSize } from "./hooks/useWindowSize";

import scratchMe from "./assets/scratchMe.webp";
import gratteMoi from "./assets/gratteMoi.webp";
import { useState } from "react";

function App() {
  const [scratchedPercent, setScratchedPercent] = useState(100);
  const { width, height } = useWindowSize();

  document.addEventListener(
    "touchmove",
    function (event) {
      event.preventDefault();
    },
    { passive: false },
  );

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
    <main className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <h1 className="text-2xl text-indigo-700">🧑‍🎄 Al 🤹‍♂️</h1>
      <ScratchCard
        width={canvasSize}
        height={canvasSize}
        image={gratteMoi}
        brushSize={20}
        setScratchedPercent={setScratchedPercent}
      />
      <h2 className="font-sans text-sm font-bold text-indigo-600">
        {scratchedPercent.toFixed(0)}%
      </h2>
      <div className="mb-4 h-24 w-full overflow-hidden px-2">
        {scratchedPercent < 15 && (
          <>
            <h2 className="animate-fadeIn text-center text-base">
              Une place pour aller au cirque d hiver pour un pestacle delirant
            </h2>
            <p className="animate-fadeInDelayed text-center text-base opacity-0">
              Equilibriste, accrobate, jongleur, clown, magicien, trapeziste on
              est chauuuud
            </p>
            <p className="animate-fadeInDelayed2 text-center text-base opacity-0">
              Joyeux Noel 🎄
            </p>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
